import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { Box, Grid, Typography } from '@mui/material';
import PokemonCard from '../components/PokemonCard';

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <Box sx={{ p: 2 }}>
      {favorites.length > 0 ? (
        <Grid container spacing={2}>
          {favorites.map((pokemon) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
              <PokemonCard pokemon={pokemon} image={pokemon.url} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5" align="center" color="textSecondary" mt={10}>
          No favorite Pokémon yet!
        </Typography>
      )}
    </Box>
  );
}
