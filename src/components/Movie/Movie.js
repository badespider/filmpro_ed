import React from 'react';
import { typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { link } from 'react-router-dom';

import useStyles from './styles';

function Movie({ movie, i }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <typography className={classes.title} variant="h5">{movie.title}</typography>
    </Grid>
  );
}

export default Movie;
