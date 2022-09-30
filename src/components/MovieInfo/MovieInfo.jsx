import React from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, theaters, language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useGetMovieQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../app/Features/currentGenreOrCategory';
// import { useDispatch, useSelector } from "react-redux";

function MovieInfo() {
  console.log('movie info');
  const { id } = useParams();
  const classes = useStyles();

  const { data, isFetching, error } = useGetMovieQuery(id);
  const dispach = useDispatch();
  if (isFetching) {
    return (
      <Box
        display="flex"
        justifyContent="center "
        alignItems="center"
      ><CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center "
        alignItems="center"
      ><Link to="/">Something got wrong -Go back</Link>
      </Box>
    );
  }
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title} />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>{data?.title}{(data.release_date.split('-')[0])}</Typography>
        <Typography variant="h5" align="center" gutterBottom>{data?.tagline}{(data.release_date.split('-')[3])}</Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />

            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>{data?.vote_average}/10</Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min / {data?.spoken_languages.length > 0 ? data?.spoken_languages[0].name : ''}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link key={genre.name} className={classes.links} to="/" onClick={() => dispach(selectGenreOrCategory(genre.id))}>
              <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImages} height={30} />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5 " gutterBottom style={{ marginTop: '10px' }}>Overview</Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5 " gutterBottom>Top Cast</Typography>
      </Grid>
    </Grid>
  );
}

export default MovieInfo;

