import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// b687b4794f57fbfb59711fc03f84e679
// /movie/popular?api_key=<<api_key>>&language=en-US&page=1
const page = 1;
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
      query: () => {
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
} = tmdbApi;
