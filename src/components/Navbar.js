import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/appContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const { favorites } = useContext(StoreContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1a1a2e' }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-star-fill" style={{ marginRight: '8px', color: '#FFD700' }}></i>
          Star Wars Blog
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house" style={{ marginRight: '4px' }}></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                <i className="bi bi-heart-fill" style={{ marginRight: '4px', color: '#FF6B6B' }}></i>
                Favorites ({favorites.length})
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
