import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pokedex from './containers/Pokedex';
import AppNavigator from './components/AppNavigator';
import PokemonDetails from './containers/PokemonDetails';
import Favorites from './pages/Favorites';
 // ADD this
import { FavoritesProvider } from './contexts/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <Router>
        <AppNavigator />
        <Routes>
          <Route exact path="/" element={<Pokedex />} />
          <Route exact path="/pokemon/:id" element={<PokemonDetails />} />
          <Route exact path="/favorites" element={<Favorites />} /> {/* NEW Favorites page */}
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}
