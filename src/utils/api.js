// This file contains utility functions for the API
// For now using local data - can be connected to backend endpoints later

// Character images using SWAPI and alternate sources
const characterImages = {
  1: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png', // Luke
  2: 'https://upload.wikimedia.org/wikipedia/en/5/5c/C-3PO.png', // C-3PO
  3: 'https://upload.wikimedia.org/wikipedia/en/8/8d/R2D2_Droid.png', // R2-D2
  4: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Darth_Vader.jpg', // Darth Vader
  5: 'https://upload.wikimedia.org/wikipedia/en/1/1f/Leia_Organa.png', // Leia
  10: 'https://upload.wikimedia.org/wikipedia/en/3/32/Obi_wan_head.png', // Obi-Wan
};

const vehicleImages = {
  4: 'https://upload.wikimedia.org/wikipedia/en/c/c7/X-wing_Star_Wars.png', // X-wing
  5: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/SW_-_TIE_Fighter.svg/440px-SW_-_TIE_Fighter.svg.png', // TIE
  14: 'https://upload.wikimedia.org/wikipedia/en/9/94/Snowspeeder.png', // Snowspeeder
};

const planetImages = {
  1: 'https://upload.wikimedia.org/wikipedia/en/b/b0/Tatooine_%28fictional_planet%29.jpg', // Tatooine
  2: 'https://upload.wikimedia.org/wikipedia/en/5/5a/Alderaan.jpg', // Alderaan
  3: 'https://upload.wikimedia.org/wikipedia/en/9/9c/Yavin4.jpg', // Yavin IV
  4: 'https://upload.wikimedia.org/wikipedia/en/3/3f/Hoth_ice_planet.jpg', // Hoth
};

export const getImageUrl = (type, uid) => {
  // Try custom image mapping first
  if (type === 'people' && characterImages[uid]) {
    return characterImages[uid];
  }
  if (type === 'vehicles' && vehicleImages[uid]) {
    return vehicleImages[uid];
  }
  if (type === 'planets' && planetImages[uid]) {
    return planetImages[uid];
  }
  
  // Fallback to Star Wars Visual Guide
  return `https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`;
};

// Placeholder functions - data is now loaded from Home.js component directly
export const fetchCharacters = async () => {
  return [];
};

export const fetchVehicles = async () => {
  return [];
};

export const fetchPlanets = async () => {
  return [];
};

export const fetchCharacterDetail = async (uid) => {
  return null;
};

export const fetchVehicleDetail = async (uid) => {
  return null;
};

export const fetchPlanetDetail = async (uid) => {
  return null;
};
