import React, { createContext, useState, useEffect } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('starwars_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('starwars_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.find(
        (fav) => fav.uid === item.uid && fav.type === item.type
      );
      if (exists) {
        return prevFavorites.filter(
          (fav) => !(fav.uid === item.uid && fav.type === item.type)
        );
      } else {
        return [...prevFavorites, item];
      }
    });
  };

  const isFavorite = (item) => {
    return favorites.some(
      (fav) => fav.uid === item.uid && fav.type === item.type
    );
  };

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    characters,
    setCharacters,
    vehicles,
    setVehicles,
    planets,
    setPlanets,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
