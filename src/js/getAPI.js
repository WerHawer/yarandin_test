'use strict';

import axios from 'axios';

const baseUrl = 'https://swapi.co/api/';

export default {
  query: 'films/',
  filmList: [],

  async getList() {
    const filmList = await axios.get(baseUrl + this.query);

    const result = filmList.data.results;

    return result;
  },

  async searchDetails(url) {
    const result = await axios.get(url);

    return result.data;
  },

  get filmsArr() {
    return this.filmList;
  },

  set filmsArr(arr) {
    this.filmList = [...arr];
  },
};
