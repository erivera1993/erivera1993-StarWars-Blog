import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/appContext';
import Card from '../components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const Favorites = () => {
  const { favorites } = useContext(StoreContext);

  if (favorites.length === 0) {
    return (
      <div className="container my-5">
        <h1 className="mb-4">My Favorites</h1>
        <div className="alert alert-info text-center">
          <h5>No favorites yet</h5>
          <p className="mb-3">Start adding items to your favorites by clicking the heart icon!</p>
          <Link to="/" className="btn btn-primary">
            <i className="bi bi-arrow-left" style={{ marginRight: '4px' }}></i>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Group favorites by type
  const groupedFavorites = {
    people: favorites.filter(fav => fav.type === 'people'),
    vehicles: favorites.filter(fav => fav.type === 'vehicles'),
    planets: favorites.filter(fav => fav.type === 'planets'),
  };

  const renderSection = (title, icon, items, type) => {
    if (items.length === 0) return null;

    return (
      <div key={type} className="mb-5">
        <h3 className="mb-4">
          <i className={`bi ${icon}`} style={{ marginRight: '8px' }}></i>
          {title} ({items.length})
        </h3>
        <div className="row g-4">
          {items.map((item) => (
            <div key={item.uid} className="col-md-6 col-lg-4 col-xl-3">
              <Card item={item} type={type} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Favorites</h1>
        <Link to="/" className="btn btn-secondary">
          <i className="bi bi-arrow-left" style={{ marginRight: '4px' }}></i>
          Back to Home
        </Link>
      </div>

      <div className="alert alert-success">
        <p className="mb-0">
          <i className="bi bi-heart-fill" style={{ marginRight: '8px', color: '#FF6B6B' }}></i>
          You have {favorites.length} favorite item{favorites.length !== 1 ? 's' : ''}
        </p>
      </div>

      {renderSection('Characters', 'bi-person', groupedFavorites.people, 'people')}
      {renderSection('Vehicles', 'bi-car-front', groupedFavorites.vehicles, 'vehicles')}
      {renderSection('Planets', 'bi-globe', groupedFavorites.planets, 'planets')}
    </div>
  );
};

export default Favorites;
