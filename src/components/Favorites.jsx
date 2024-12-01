import axios from 'axios';
import React, { useEffect } from 'react';

const Favorites = ({ favorites, setFavorites, currentCity }) => {
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [setFavorites]);

  const addFavorite = async () => {
    if (!currentCity) return;

    try {
      const response = await axios.post('http://localhost:5000/favorites', { city: currentCity });
      setFavorites([...favorites, response.data]);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/${id}`);
      setFavorites(favorites.filter(fav => fav.id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite cities added yet.</p>
      ) : (
        <ul>
          {favorites.map(fav => (
            <li key={fav.id}>
              {fav.city}
              <button onClick={() => removeFavorite(fav.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={addFavorite}>Add to Favorites</button>
    </div>
  );
};

export default Favorites;