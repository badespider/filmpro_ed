import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

function Profile() {
  const { user } = useSelector((state) => state.user);
  const favoriteMovies = [];
  // const { username } = user;
  console.log(user);
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between"> <Typography variant="h4" gutterbottom>badespider&apos;Profile</Typography></Box>
      <Button color="inherit" onClick={logout}>
        Logout  ;<ExitToApp />
      </Button>
      {!favoriteMovies.length ? <Typography variant="h5">Add favorite or watchlist  some movie to see them here</Typography>
        : <Box>favorite movies</Box>}
    </Box>

  );
}

export default Profile;
