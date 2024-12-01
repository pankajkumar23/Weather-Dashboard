import React, { useState, useEffect } from 'react';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import Favorites from './Favorites';
import axios from 'axios';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
      fetchWeather(savedCity);
    }
  }, []);

  const fetchWeather = async (city) => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    try {
      // current weather
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      setWeatherData(weatherResponse.data);
      
      //  5-day forecast
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
      setForecastData(forecastResponse.data);
      
      localStorage.setItem('lastCity', city);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      
    }
  };

  const handleSearch = (city) => {
    setCity(city);
    fetchWeather(city);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <WeatherDisplay weatherData={weatherData} forecastData={forecastData} />
      <Favorites favorites={favorites} setFavorites={setFavorites} currentCity={city} />
    </div>
  );
};

export default WeatherDashboard;