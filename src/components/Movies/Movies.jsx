import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';

function Movies() {
  const { data } = useGetMoviesQuery();
  console.log(data);
  return (
    <div><MovieList Movies={data} />
    </div>
  );
}

export default Movies;
