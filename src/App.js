import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/appContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Details from './pages/Details';
import Favorites from './pages/Favorites';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <StoreProvider>
      <Router>
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:type/:uid" element={<Details />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
