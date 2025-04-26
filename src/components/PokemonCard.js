import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../contexts/FavoritesContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const useStyles = makeStyles(() => ({
  card: {
    cursor: 'pointer',
    backgroundColor: 'black',
    color: 'white',
    position: 'relative', // Added for absolute heart icon
    "&:hover": {
      backgroundColor: "rgb(90,90,90)"
    }
  },
  cardMedia: {
    margin: "auto",
    width: 130,
    height: 130,
  },
  cardContent: {
    textAlign: 'center'
  },
  link: {
    textDecoration: "none"
  },
  favoriteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    color: 'red'
  }
}));

export default function PokemonCard({ pokemon, image }) {
  const classes = useStyles();
  const { id, name } = pokemon;

  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // IMPORTANT: Prevent clicking the card navigation
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <Link to={"/pokemon/" + id} className={classes.link}>
      <Card className={classes.card}>
        <IconButton className={classes.favoriteButton} onClick={handleFavoriteClick}>
          {isFavorite(id) ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <CardMedia
          className={classes.cardMedia}
          image={image}
          title={name}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" align="center">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
