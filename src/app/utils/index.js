/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import axios from 'axios';

// const axios = require("axios");

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});
export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get('/authentication/token/new');
    const token = data.request_token;
    if (data.success) {
      localStorage.setItem('request_token', token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log("sorry yor token can't be created");
  }
};
/* eslint camelcase: ["error", {ignoreDestructuring: true}] */
const CreateSessionId = async () => {
  const token = localStorage.getItem('request_token');
  if (token) {
    try {
      const {
        data: { session_id } } = await moviesApi.post('authentication/session/new', {
        request_token: token,
      });
      localStorage.setItem('session_id', session_id);
      return session_id;
    } catch (error) {
      console.log(error);
    }
  }
};
export default CreateSessionId;
