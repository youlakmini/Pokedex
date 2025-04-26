import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { POKEMON_API_URL } from '../config';

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${POKEMON_API_URL}/${id}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setPokemon(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching Pokémon details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div style={{
      backgroundColor: 'black',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      padding: '20px'
    }}>
      {loading ? (
        <div className="loading-container">
          <h2>Loading...</h2>
        </div>
      ) : pokemon ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '400px',
          padding: '30px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{
            fontSize: '2rem',
            marginBottom: '20px',
            color: '#ffcb05' // Pokemon yellow color
          }}>
            {pokemon.name.toUpperCase()}
          </h1>
          
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
              style={{
                width: '200px',
                height: '200px'
              }}
            />
          </div>
          
          <div style={{
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '10px',
            padding: '15px',
            marginTop: '10px'
          }}>
            <p style={{ margin: '10px 0' }}>
              <span style={{ color: '#ffcb05' }}>ID:</span> #{String(pokemon.id).padStart(3, '0')}
            </p>
            <p style={{ margin: '10px 0' }}>
              <span style={{ color: '#ffcb05' }}>Height:</span> {(pokemon.height / 10).toFixed(1)} m
            </p>
            <p style={{ margin: '10px 0' }}>
              <span style={{ color: '#ffcb05' }}>Weight:</span> {(pokemon.weight / 10).toFixed(1)} kg
            </p>
            <p style={{ margin: '10px 0' }}>
              <span style={{ color: '#ffcb05' }}>Types:</span> {pokemon.types.map((t) => (
                <span 
                  key={t.type.name} 
                  style={{
                    display: 'inline-block',
                    backgroundColor: getTypeColor(t.type.name),
                    padding: '5px 10px',
                    borderRadius: '20px',
                    margin: '0 5px',
                    fontSize: '0.9rem'
                  }}
                >
                  {t.type.name.toUpperCase()}
                </span>
              ))}
            </p>
            <p style={{ margin: '10px 0' }}>
              <span style={{ color: '#ffcb05' }}>Abilities:</span> {pokemon.abilities.map(a => 
                a.ability.name.replace('-', ' ')
              ).join(', ')}
            </p>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2>Pokémon not found</h2>
        </div>
      )}
    </div>
  );
}

// Helper function to get color based on Pokémon type
function getTypeColor(type) {
  const colors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };
  
  return colors[type] || '#68A090'; // Default color if type not found
}