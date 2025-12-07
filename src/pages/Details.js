import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/appContext';
import { getImageUrl } from '../utils/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const Details = () => {
  const { type, uid } = useParams();
  const { toggleFavorite, isFavorite } = useContext(StoreContext);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Sample data for demonstration
  const sampleData = {
    people: {
      1: { uid: 1, name: 'Luke Skywalker', summary: 'A farm boy from Tatooine who becomes a Jedi Knight. Luke is the son of Anakin Skywalker and the brother of Leia Organa. He plays a crucial role in the Rebel Alliance\'s fight against the Galactic Empire.', properties: { height: '172', mass: '77', gender: 'male', hair_color: 'blond', eye_color: 'blue', birth_year: '19BBY', skin_color: 'fair' }, type: 'people' },
      2: { uid: 2, name: 'C-3PO', summary: 'A protocol droid designed to assist humans by programmed in etiquette and languages. C-3PO is fluent in over six million forms of communication and serves as a translator and advisor throughout the Star Wars saga.', properties: { height: '167', mass: '75', gender: 'n/a', hair_color: 'n/a', eye_color: 'yellow', birth_year: '112BBY', skin_color: 'gold' }, type: 'people' },
      3: { uid: 3, name: 'R2-D2', summary: 'An astromech droid known for his resourcefulness and bravery. R2-D2 is a loyal companion to Luke Skywalker and Obi-Wan Kenobi, often communicating through beeps and whistles while solving complex technical problems.', properties: { height: '96', mass: '32', gender: 'n/a', hair_color: 'n/a', eye_color: 'red', birth_year: '33BBY', skin_color: 'white, blue' }, type: 'people' },
      4: { uid: 4, name: 'Darth Vader', summary: 'Born as Anakin Skywalker, he becomes a powerful Sith Lord and enforcer of the Galactic Empire. Vader is a master of the Force and one of the most feared figures in the galaxy, serving as the right hand of Emperor Palpatine.', properties: { height: '202', mass: '136', gender: 'male', hair_color: 'none', eye_color: 'yellow', birth_year: '41.9BBY', skin_color: 'pale' }, type: 'people' },
      5: { uid: 5, name: 'Leia Organa', summary: 'The princess of Alderaan and sister of Luke Skywalker. Leia is a fearless leader of the Rebel Alliance who fights against the tyranny of the Galactic Empire with intelligence, courage, and diplomatic skill.', properties: { height: '150', mass: '49', gender: 'female', hair_color: 'brown', eye_color: 'brown', birth_year: '19BBY', skin_color: 'light' }, type: 'people' },
      10: { uid: 10, name: 'Obi-Wan Kenobi', summary: 'A legendary Jedi Master who trained both Anakin Skywalker and Luke Skywalker. Obi-Wan is known for his wisdom, skill in lightsaber combat, and dedication to the Jedi Order and the principles of the Force.', properties: { height: '182', mass: '77', gender: 'male', hair_color: 'auburn, white', eye_color: 'blue-gray', birth_year: '57BBY', skin_color: 'fair' }, type: 'people' },
    },
    vehicles: {
      4: { uid: 4, name: 'X-wing', summary: 'A versatile starfighter used by the Rebel Alliance, known for its distinctive S-foils that open into an X configuration during combat. The X-wing is a symbol of the Rebellion and excels in dogfighting with superior maneuverability and firepower.', properties: { model: 'T-65 X-wing', manufacturer: 'Incom Corporation', vehicle_class: 'Starfighter', crew: '1', passengers: '0', max_atmosphering_speed: '1050', cargo_capacity: '110', length: '12.5', cost_in_credits: '149999' }, type: 'vehicles' },
      5: { uid: 5, name: 'TIE Advanced x1', summary: 'An advanced Imperial starfighter piloted by Darth Vader himself. The TIE Advanced features enhanced shielding, superior speed, and advanced targeting systems, making it one of the most formidable fighters in the galaxy.', properties: { model: 'TIE/x1', manufacturer: 'Sienar Fleet Systems', vehicle_class: 'Starfighter', crew: '1', passengers: '0', max_atmosphering_speed: '1200', cargo_capacity: '150', length: '9.2', cost_in_credits: '1000000' }, type: 'vehicles' },
      14: { uid: 14, name: 'Snowspeeder', summary: 'A two-person airspeeder designed for reconnaissance and combat on ice planets. The Snowspeeder is fast and agile, equipped with rotating laser cannons. It was notably used by the Rebel Alliance on the ice planet Hoth.', properties: { model: 't-47 airspeeder', manufacturer: 'Incom corporation', vehicle_class: 'Airspeeder', crew: '2', passengers: '0', max_atmosphering_speed: '650', cargo_capacity: '10', length: '4.5', cost_in_credits: '24950' }, type: 'vehicles' },
    },
    planets: {
      1: { uid: 1, name: 'Tatooine', summary: 'A desert planet in the Outer Rim, best known as the birthplace of Anakin and Luke Skywalker. Tatooine is a harsh, arid world with twin sunsets, twin moons, and home to moisture farmers, spaceports, and the notorious Mos Eisley cantina.', properties: { diameter: '10465', terrain: 'desert', climate: 'arid', gravity: '1', population: '200000', rotation_period: '23', orbital_period: '304', surface_water: '1' }, type: 'planets' },
      2: { uid: 2, name: 'Alderaan', summary: 'A peaceful, beautiful planet known for its culture and peaceful traditions. Alderaan is the home of Princess Leia Organa and is famous for its natural beauty, architecture, and intellectual achievements before its tragic destruction.', properties: { diameter: '12500', terrain: 'grasslands, mountains', climate: 'temperate', gravity: '1', population: '2000000000', rotation_period: '24', orbital_period: '364', surface_water: '40' }, type: 'planets' },
      3: { uid: 3, name: 'Yavin IV', summary: 'A jungle moon with dense rainforests and ancient temples. Yavin IV served as a secret base for the Rebel Alliance during their fight against the Empire. The moon is home to massive ruins that hold historical significance.', properties: { diameter: '10200', terrain: 'jungle, rainforest', climate: 'temperate, tropical', gravity: '1', population: '1000', rotation_period: '24', orbital_period: '4818', surface_water: '8' }, type: 'planets' },
      4: { uid: 4, name: 'Hoth', summary: 'An ice planet covered in snow and tundra, located in the Outer Rim. Hoth served as the secret base of the Rebel Alliance during the Galactic War. The frozen world is inhospitable, with deadly creatures and extreme cold conditions.', properties: { diameter: '7200', terrain: 'tundra, ice caves, mountain ranges', climate: 'frozen', gravity: '1.1', population: '30000', rotation_period: '23', orbital_period: '549', surface_water: '100' }, type: 'planets' },
    }
  };

  useEffect(() => {
    // Load sample data
    const typeKey = type === 'people' ? 'people' : type;
    const detail = sampleData[typeKey]?.[uid];
    
    if (detail) {
      setItem(detail);
    } else {
      // Fallback if not found
      setItem({
        uid,
        name: `Sample ${type}`,
        properties: {},
        type
      });
    }
  }, [type, uid]);

  const handleFavoriteClick = () => {
    toggleFavorite(item);
  };

  const isItemFavorite = item ? isFavorite(item) : false;
  const imageUrl = item ? getImageUrl(type, item.uid) : '';

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading details...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4>Item not found</h4>
          <p>The requested item could not be found.</p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const renderProperties = () => {
    if (type === 'people') {
      return (
        <div className="row g-3">
          <div className="col-md-6">
            <p><strong>Height:</strong> {item.properties?.height || 'N/A'}</p>
            <p><strong>Mass:</strong> {item.properties?.mass || 'N/A'}</p>
            <p><strong>Hair Color:</strong> {item.properties?.hair_color || 'N/A'}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Skin Color:</strong> {item.properties?.skin_color || 'N/A'}</p>
            <p><strong>Eye Color:</strong> {item.properties?.eye_color || 'N/A'}</p>
            <p><strong>Birth Year:</strong> {item.properties?.birth_year || 'N/A'}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Gender:</strong> {item.properties?.gender || 'N/A'}</p>
          </div>
        </div>
      );
    } else if (type === 'vehicles') {
      return (
        <div className="row g-3">
          <div className="col-md-6">
            <p><strong>Model:</strong> {item.properties?.model || 'N/A'}</p>
            <p><strong>Manufacturer:</strong> {item.properties?.manufacturer || 'N/A'}</p>
            <p><strong>Class:</strong> {item.properties?.vehicle_class || 'N/A'}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Cost in Credits:</strong> {item.properties?.cost_in_credits || 'N/A'}</p>
            <p><strong>Length:</strong> {item.properties?.length || 'N/A'}</p>
            <p><strong>Crew:</strong> {item.properties?.crew || 'N/A'}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Passengers:</strong> {item.properties?.passengers || 'N/A'}</p>
            <p><strong>Cargo Capacity:</strong> {item.properties?.cargo_capacity || 'N/A'}</p>
            <p><strong>Max Speed:</strong> {item.properties?.max_atmosphering_speed || 'N/A'}</p>
          </div>
        </div>
      );
    } else if (type === 'planets') {
      return (
        <div className="row g-3">
          <div className="col-md-6">
            <p><strong>Diameter:</strong> {item.properties?.diameter || 'N/A'}</p>
            <p><strong>Rotation Period:</strong> {item.properties?.rotation_period || 'N/A'}</p>
            <p><strong>Orbital Period:</strong> {item.properties?.orbital_period || 'N/A'}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Gravity:</strong> {item.properties?.gravity || 'N/A'}</p>
            <p><strong>Population:</strong> {item.properties?.population || 'N/A'}</p>
            <p><strong>Climate:</strong> {item.properties?.climate || 'N/A'}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Terrain:</strong> {item.properties?.terrain || 'N/A'}</p>
            <p><strong>Surface Water:</strong> {item.properties?.surface_water || 'N/A'}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container my-5">
      <Link to="/" className="btn btn-secondary mb-4">
        <i className="bi bi-arrow-left" style={{ marginRight: '4px' }}></i>
        Back to Home
      </Link>

      <div className="row">
        <div className="col-md-4 mb-4">
          <img
            src={imageUrl}
            alt={item.name}
            className="img-fluid rounded shadow"
            style={{ width: '100%', backgroundColor: '#333', minHeight: '400px' }}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23333" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" fill="%23fff" text-anchor="middle" dy=".3em" font-size="20"%3EStar Wars Image%3C/text%3E%3C/svg%3E';
            }}
          />
          <button
            className={`btn w-100 mt-3 ${
              isItemFavorite ? 'btn-danger' : 'btn-outline-danger'
            }`}
            onClick={handleFavoriteClick}
          >
            <i
              className={`bi bi-heart${isItemFavorite ? '-fill' : ''}`}
              style={{ marginRight: '8px' }}
            ></i>
            {isItemFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>

        <div className="col-md-8">
          <h1>{item.name}</h1>
          <div className="alert alert-info mt-3 mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            <p style={{ margin: 0 }}>{item.summary || `Learn more about ${item.name}`}</p>
          </div>
          <h4 className="mt-4 mb-3">Details</h4>
          <hr />
          {renderProperties()}
        </div>
      </div>
    </div>
  );
};

export default Details;
