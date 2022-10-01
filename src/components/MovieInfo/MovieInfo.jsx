import React from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, theaters, language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack, Language, Theaters } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { style } from '@mui/system';
import MovieList from '../MovieList/MovieList';
import { useGetMovieQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../app/Features/currentGenreOrCategory';
// import { useDispatch, useSelector } from "react-redux";
import { useGetRecommendationsQuery } from '../../services/TMDB';

function MovieInfo() {
  console.log('movie info');
  const { id } = useParams();
  const classes = useStyles();
  const isMovieFavorited = true;
  const isMovieWatchlisted = true;
  const { data: recommendations, isFetching: isrecommendationFetching } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id });

  const addToFavorites = () => {};
  const addToWatchList = () => {

  };
  const { data, isFetching, error } = useGetMovieQuery(id);
  console.log(data);
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
            <Link style={{ textDecoration: 'none' }} key={genre.name} className={classes.links} to="/" onClick={() => dispach(selectGenreOrCategory(genre.id))}>
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
        <Typography variant="h5 " gutterBottom style={{ marginTop: '10px' }}>Top Cast</Typography>
        <Grid item container spacing={2}>
          {data && data?.credits?.cast?.map((character, i) => (
            character.profile_path && (
            <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
              <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
              <Typography color="textPrimary">{character?.name}</Typography>
              <Typography color="textSecondary">{character.character.split('/')[0]}</Typography>
            </Grid>
            )
          )).slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button target="_blank" href={data?.homepage} endIcon={<Language />}>Website</Button>
                <Button target="_blank" href={`https//www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>Imdb</Button>
                <Button onClick={() => {}} href="#" endIcon={<Theaters />}>Trailer</Button>

              </ButtonGroup>
              <ButtonGroup size="medium" variant="outlined">
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'unfavorite' : 'Favorite'}
                </Button>
                <Button onClick={addToWatchList} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  {isMovieWatchlisted ? 'remove from Watchlist' : 'add to watchlist'}
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography component={Link} to="/" color="inherit" variant="subtitle2" style={{ textDecoration: 'none' }}>back</Typography>
                </Button>
              </ButtonGroup>
            </Grid>

          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          you might also like
        </Typography>
        {recommendations ? <MovieList movies={recommendations} numberOfMovies={12} /> : <Box>sorry nothing was found</Box>}

      </Box>
    </Grid>
  );
}

export default MovieInfo;

