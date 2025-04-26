import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { POKEMON_API_URL, IMAGE_API_URL } from '../config';
import PokemonCard from '../components/PokemonCard';

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    textAlign: "center",
    padding: "70px 10px 0px 10px",
    backgroundColor: "rgb(68,68,68)"
  },
}));

export default function Pokedex() {
  const [pokemonData, setPokemonData] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    axios.get(POKEMON_API_URL + "?limit=800").then((response) => {
      if (response.status >= 200 && response.status < 300) {
        const { results } = response.data;
        const newPokemonData = results.map((pokemon, index) => {
          const id = index + 1;
          return {
            id: id,
            name: pokemon.name,
            url: IMAGE_API_URL + id + ".png"
          };
        });
        setPokemonData(newPokemonData);
      }
    });
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      {pokemonData && pokemonData.length > 0 ? (
        <Grid container className={classes.pokedexContainer} spacing={2}>
          {pokemonData.map((pokemon) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
              <PokemonCard pokemon={pokemon} image={pokemon.url} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <CircularProgress style={{ marginTop: 100 }} />
      )}
    </Box>
  );
}
