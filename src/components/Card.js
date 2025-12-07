import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/appContext';
import { getImageUrl } from '../utils/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ item, type }) => {
  const { toggleFavorite, isFavorite } = useContext(StoreContext);

  const handleFavoriteClick = () => {
    toggleFavorite({ ...item, type });
  };

  const imageUrl = getImageUrl(type, item.uid);
  const isItemFavorite = isFavorite({ ...item, type });

  // Get additional info based on type
  let additionalInfo = '';
  if (type === 'people') {
    additionalInfo = `Gender: ${item.gender || 'N/A'}`;
  } else if (type === 'vehicles') {
    additionalInfo = `Model: ${item.model || 'N/A'}`;
  } else if (type === 'planets') {
    additionalInfo = `Terrain: ${item.terrain || 'N/A'}`;
  }

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="position-relative">
        <img
          src={imageUrl}
          alt={item.name}
          className="card-img-top"
          style={{ height: '250px', objectFit: 'cover', backgroundColor: '#2c3e50' }}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="250"%3E%3Crect fill="%232c3e50" width="250" height="250"/%3E%3Ctext x="50%25" y="50%25" fill="%23ecf0f1" text-anchor="middle" dy=".3em" font-size="16"%3EStar Wars%3C/text%3E%3C/svg%3E';
          }}
        />
        {isItemFavorite && (
          <div className="position-absolute top-0 end-0 p-2">
            <span className="badge bg-danger">❤️ Saved</span>
          </div>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-dark">{item.name}</h5>
        <p className="card-text text-muted small flex-grow-1">
          {additionalInfo}
        </p>
      </div>
      <div className="card-footer bg-white border-top d-flex gap-2">
        <Link
          to={`/details/${type}/${item.uid}`}
          className="btn btn-sm btn-primary flex-grow-1"
        >
          Learn More
        </Link>
        <button
          className={`btn btn-sm ${
            isItemFavorite ? 'btn-danger' : 'btn-outline-warning'
          }`}
          onClick={handleFavoriteClick}
          title={isItemFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isItemFavorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default Card;
