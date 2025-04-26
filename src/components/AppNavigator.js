import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'black'
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  marginRight: '20px'
});

export default function AppNavigator() {
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <StyledLink to="/">
          <Typography variant="h6">Pokedex</Typography>
        </StyledLink>
        <StyledLink to="/favorites">
          <Typography variant="h6">Favorites</Typography>
        </StyledLink>
      </Toolbar>
    </StyledAppBar>
  );
}
