'use strict';

import refs from './refs';
import getApi from './getAPI';
import { renderFilmsList, cleanPage } from './render';

let revers = 1;

function sortListByName() {
  getApi.filmList.sort((a, b) => {
    const nameA = a.title.toLowerCase();
    const nameB = b.title.toLowerCase();

    if (nameA > nameB) return 1 * revers;
    if (nameA < nameB) return -1 * revers;
    return 0;
  });

  revers = revers * -1;
  cleanPage(refs.output);
  renderFilmsList(getApi.filmList);
}

export default sortListByName;
