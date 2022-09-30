
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// b687b4794f57fbfb59711fc03f84e679
// /movie/popular?api_key=<<api_key>>&language=en-US&page=1
// const page = 1;

const tmdbApiKey = 'b687b4794f57fbfb59711fc03f84e679';
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //* Get Movie  by [type]

    //* Get genres
    getGenres: builder.query({
      // eslint-disable-next-line arrow-body-style
      query: () => {
        return `genre/movie/list?api_key=${tmdbApiKey}`;
      },
    }),
    getMovies: builder.query({
      // eslint-disable-next-line arrow-body-style
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get Movie by search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }
        if (
          genreIdOrCategoryName
          && typeof genreIdOrCategoryName === 'string'
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }
        if (
          genreIdOrCategoryName
          && typeof genreIdOrCategoryName === 'number'
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }
        //* Get popular movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    // GetMovies
    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),

  }),
});

export const { useGetGenresQuery, useGetMoviesQuery, useGetMovieQuery } = tmdbApi;
