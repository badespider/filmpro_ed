import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList } from '..';
import { selectGenreOrCategory } from '../../app/Features/currentGenreOrCategory';

function Movies() {
  const [page, setpage] = useState(1);
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);

  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page });
  if (isFetching) {
    return (
      <Box display="flex " justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4"> no movie that match the mane</Typography>
      </Box>
    );
  }
  if (error) return 'An error happend';

  return (
    <div>
      <MovieList movies={data} />

    </div>
  );
}

export default Movies;
