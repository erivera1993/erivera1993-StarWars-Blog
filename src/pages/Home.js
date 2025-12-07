import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/appContext';
import Card from '../components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const { characters, setCharacters, vehicles, setVehicles, planets, setPlanets } = useContext(StoreContext);
  const [activeTab, setActiveTab] = useState('people');
  const [loading, setLoading] = useState(false);

  // Sample data for demonstration
  const sampleCharacters = [
    { uid: 1, name: 'Luke Skywalker', gender: 'male', type: 'people' },
    { uid: 2, name: 'C-3PO', gender: 'n/a', type: 'people' },
    { uid: 3, name: 'R2-D2', gender: 'n/a', type: 'people' },
    { uid: 4, name: 'Darth Vader', gender: 'male', type: 'people' },
    { uid: 5, name: 'Leia Organa', gender: 'female', type: 'people' },
    { uid: 6, name: 'Owen Lars', gender: 'male', type: 'people' },
    { uid: 7, name: 'Beru Whitesun lars', gender: 'female', type: 'people' },
    { uid: 8, name: 'R5-D4', gender: 'n/a', type: 'people' },
    { uid: 9, name: 'Biggs Darklighter', gender: 'male', type: 'people' },
    { uid: 10, name: 'Obi-Wan Kenobi', gender: 'male', type: 'people' },
    { uid: 11, name: 'Anakin Skywalker', gender: 'male', type: 'people' },
    { uid: 12, name: 'Wilhuff Tarkin', gender: 'male', type: 'people' },
  ];

  const sampleVehicles = [
    { uid: 4, name: 'X-wing', model: 'T-65 X-wing', type: 'vehicles' },
    { uid: 5, name: 'TIE Advanced x1', model: 'TIE/x1', type: 'vehicles' },
    { uid: 14, name: 'Snowspeeder', model: 't-47 airspeeder', type: 'vehicles' },
    { uid: 16, name: 'TIE bomber', model: 'TIE/sa bomber', type: 'vehicles' },
    { uid: 18, name: 'AT-AT', model: 'All Terrain Armored Transport', type: 'vehicles' },
    { uid: 19, name: 'AT-ST', model: 'All Terrain Scout Transport', type: 'vehicles' },
  ];

  const samplePlanets = [
    { uid: 1, name: 'Tatooine', terrain: 'desert', type: 'planets' },
    { uid: 2, name: 'Alderaan', terrain: 'grasslands, mountains', type: 'planets' },
    { uid: 3, name: 'Yavin IV', terrain: 'jungle, rainforest', type: 'planets' },
    { uid: 4, name: 'Hoth', terrain: 'tundra, ice caves, mountain ranges', type: 'planets' },
    { uid: 5, name: 'Dagobah', terrain: 'swamp, jungles', type: 'planets' },
    { uid: 9, name: 'Coruscant', terrain: 'cityscape, mountains', type: 'planets' },
  ];

  useEffect(() => {
    // Load sample data on mount if no data exists
    if (characters.length === 0) {
      setCharacters(sampleCharacters);
    }
    if (vehicles.length === 0) {
      setVehicles(sampleVehicles);
    }
    if (planets.length === 0) {
      setPlanets(samplePlanets);
    }
  }, []);

  const renderCards = () => {
    let data = [];
    let type = '';

    if (activeTab === 'people') {
      data = characters;
      type = 'people';
    } else if (activeTab === 'vehicles') {
      data = vehicles;
      type = 'vehicles';
    } else if (activeTab === 'planets') {
      data = planets;
      type = 'planets';
    }

    return (
      <div className="row g-4">
        {data.map((item) => (
          <div key={item.uid} className="col-md-6 col-lg-4 col-xl-3">
            <Card item={item} type={type} />
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading Star Wars data...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Star Wars Databank</h1>

      <ul className="nav nav-tabs mb-4" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'people' ? 'active' : ''}`}
            type="button"
            onClick={() => setActiveTab('people')}
            role="tab"
          >
            <i className="bi bi-person" style={{ marginRight: '4px' }}></i>
            Characters ({characters.length})
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'vehicles' ? 'active' : ''}`}
            type="button"
            onClick={() => setActiveTab('vehicles')}
            role="tab"
          >
            <i className="bi bi-car-front" style={{ marginRight: '4px' }}></i>
            Vehicles ({vehicles.length})
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'planets' ? 'active' : ''}`}
            type="button"
            onClick={() => setActiveTab('planets')}
            role="tab"
          >
            <i className="bi bi-globe" style={{ marginRight: '4px' }}></i>
            Planets ({planets.length})
          </button>
        </li>
      </ul>

      {renderCards()}
    </div>
  );
};

export default Home;
