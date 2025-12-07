# Star Wars Blog

A minimalist Star Wars Databank with "Read Later" or "Favorites" list functionality built with React and Bootstrap.

## Features

- **Browse Star Wars Data**: View Characters, Vehicles, and Planets from the SWAPI API
- **Favorites System**: Save your favorite items to a dedicated favorites list
- **Detailed Views**: Click on any item to see more information
- **Persistent Storage**: Your favorites are saved to localStorage and persist between sessions
- **Responsive Design**: Mobile-friendly interface using Bootstrap
- **Context API**: Centralized state management for favorites across the app

## Technology Stack

- **React** 18.2.0 - UI library
- **React Router** 6.16.0 - Client-side routing
- **Bootstrap** 5.3.2 - CSS framework
- **SWAPI.tech API** - Star Wars data source
- **Context API** - State management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd erivera1993-StarWars-Blog
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Usage

1. **Home Page**: Browse through Characters, Vehicles, and Planets using the tabs
2. **Add to Favorites**: Click the heart icon on any card to save it
3. **View Details**: Click the "Details" button to see more information about an item
4. **View Favorites**: Click "Favorites" in the navbar to see all saved items
5. **Remove from Favorites**: Click the heart icon again to unsave an item

## Project Structure

```
src/
├── components/        # Reusable React components
│   ├── Card.js       # Item card component
│   └── Navbar.js     # Navigation bar
├── context/
│   └── appContext.js # Context API store for favorites
├── pages/            # Page components
│   ├── Home.js       # Main page with tabs
│   ├── Details.js    # Item details page
│   └── Favorites.js  # Favorites list page
├── utils/
│   └── api.js        # API calls and utilities
├── App.js            # Main app component
├── App.css           # App styles
└── index.js          # React entry point
```

## Features Implemented

- ✅ Fetch and display Star Wars entities from SWAPI.tech
- ✅ Favorites/Read Later functionality with Context API
- ✅ Add/remove items from favorites
- ✅ Persistent storage using localStorage
- ✅ Detailed view for each entity with full properties
- ✅ Responsive Bootstrap grid layout
- ✅ Navigation between pages with React Router

## Extra Features

- 🌟 localStorage integration - Favorites persist across sessions
- 🎨 Responsive mobile design
- ⚡ Loading states with spinners
- 🖼️ Image support from starwars-visualguide.com with fallbacks

## API Reference

Data is fetched from [SWAPI.tech](https://www.swapi.tech/):
- Characters endpoint: `/people`
- Vehicles endpoint: `/vehicles`
- Planets endpoint: `/planets`

Images are fetched from [Star Wars Visual Guide](https://starwars-visualguide.com/)

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Future Enhancements

- Search and autocomplete functionality
- Advanced filtering and sorting
- User authentication
- Comments and reviews system
- Comparisons between items

## License

This project is part of 4Geeks Academy's Full Stack Developer Course.

## Credits

Built as part of the 4Geeks Academy Coding Bootcamp by Alejandro Sanchez and contributors.
