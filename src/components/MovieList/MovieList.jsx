import React from 'react';

import { Grid } from '@mui/material';

import useStyles from './styles';

function MovieList({ movies }) {
  const classes = useStyles();
  return (
    <Grid container className={classes.moviesContainer}>{movies.result.map((movies, i) => (
      <Movies key={i} movies={movie} i={i}>  </Movies>
    ))}
    </Grid>
  );
}

export default MovieList;
