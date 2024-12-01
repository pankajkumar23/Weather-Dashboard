import React, { useState, useEffect } from 'react';

const WeatherDisplay = ({ weatherData, forecastData }) => {
  // States for temperature unit and last searched city
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [lastSearchedCity, setLastSearchedCity] = useState('');

  // Load last searched city from local storage 
  useEffect(() => {
    const storedCity = localStorage.getItem('lastSearchedCity');
    if (storedCity) {
      setLastSearchedCity(storedCity);
    }
  }, []);

  // Update last searched city in local storage 
  useEffect(() => {
    if (weatherData && weatherData.name) {
      localStorage.setItem('lastSearchedCity', weatherData.name);
      setLastSearchedCity(weatherData.name);
    }
  }, [weatherData]);

  // Function to convert Kelvin to Celsius
  const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);

  // Function to convert Kelvin to Fahrenheit
  const kelvinToFahrenheit = (temp) => ((temp - 273.15) * 9 / 5 + 32).toFixed(2);

  // Function to aggregate forecast data
  const aggregateForecast = (forecastList) => {
    const dailyForecast = {};

    forecastList.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      const temp = forecast.main.temp;

      if (!dailyForecast[date]) {
        dailyForecast[date] = {
          high: temp,
          low: temp,
          weather: forecast.weather[0].description,
        };
      } else {
        if (temp > dailyForecast[date].high) {
          dailyForecast[date].high = temp;
        }
        if (temp < dailyForecast[date].low) {
          dailyForecast[date].low = temp;
        }
      }
    });

    return dailyForecast;
  };

  if (!weatherData) return null;


  if (!forecastData || !forecastData.list) {
    return (
      <div>
        <h2>{lastSearchedCity || weatherData.name}</h2>
        <p>Temperature: 
          {unit === 'C' 
            ? `${kelvinToCelsius(weatherData.main.temp)}°C` 
            : `${kelvinToFahrenheit(weatherData.main.temp)}°F`}
        </p>
        <p>Weather: {weatherData.weather[0].description}</p>
        <p>No forecast data available.</p>
      </div>
    );
  }

  const dailyForecast = aggregateForecast(forecastData.list);
  const forecastEntries = Object.entries(dailyForecast).slice(0, 5); // Get only the first 5 days

  return (
    <div>
      <h2>{lastSearchedCity || weatherData.name}</h2>
      <p>
        Temperature: 
        {unit === 'C' 
          ? `${kelvinToCelsius(weatherData.main.temp)}°C` 
          : `${kelvinToFahrenheit(weatherData.main.temp)}°F`}
      </p>
      <p>Weather: {weatherData.weather[0].description}</p>

      <button onClick={() => setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'))}>
        Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
      </button>
      
      {forecastEntries.length > 0 ? (
        <div>
          <h3>5-Day Forecast</h3>
          {forecastEntries.map(([date, { high, low, weather }], index) => (
            <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
              <p><strong>Date:</strong> {date}</p>
              <p>
                <strong>High:</strong> 
                {unit === 'C' 
                  ? `${kelvinToCelsius(high)}°C` 
                  : `${kelvinToFahrenheit(high)}°F`}
              </p>
              <p>
                <strong>Low:</strong> 
                {unit === 'C' 
                  ? `${kelvinToCelsius(low)}°C` 
                  : `${kelvinToFahrenheit(low)}°F`}
              </p>
              <p><strong>Weather:</strong> {weather}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No forecast data available.</p>
      )}
    </div>
  );
};

export default WeatherDisplay;
