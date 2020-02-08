'use strict';
import filmsListMarkup from '../markup/filmsListMarkup.hbs';
import oneFilmMarkup from '../markup/oneFilmMarkup.hbs';
import onePeopleMarkup from '../markup/onePeopleMarkup.hbs';
import onePlanetMarkup from '../markup/onePlanetMarkup.hbs';
import searchedObjListMarkup from '../markup/searchedObjListMarkup.hbs';
import oneStarshipMarkup from '../markup/oneStarshipMarkup.hbs';
import oneVechicleMarkup from '../markup/oneVechicleMarkup.hbs';
import refs from './refs';
import getApi from './getAPI';
import { findObjByTap, getInfo } from './search';
import sortListByName from './sortFilmList';

refs.output.addEventListener('click', findObjByTap);
window.addEventListener('click', sortListByName);
FirstRender();

export function renderFilmsList(item) {
  const markup = filmsListMarkup(item);
  loadAnimationOff();
  refs.output.insertAdjacentHTML('beforeend', markup);
}

export async function FirstRender() {
  try {
    const filmList = await getApi.getList();

    getApi.filmsArr = filmList;
    renderFilmsList(filmList);
  } catch (err) {
    alert(err);
  }
}

export function cleanPage(page) {
  page.innerHTML = '';
}

export async function oneObjRender(obj, target) {
  const objInfo = await getInfo(obj);

  let markup = '';

  switch (target.dataset.type) {
    case 'film':
      markup = oneFilmMarkup(objInfo);
      break;
    case 'people':
      markup = onePeopleMarkup(objInfo);
      break;
    case 'planet':
      markup = onePlanetMarkup(objInfo);
      break;
    case 'starship':
      markup = oneStarshipMarkup(objInfo);
      break;
    case 'vehicle':
      markup = oneVechicleMarkup(objInfo);
      break;
  }

  loadAnimationOff();
  refs.output.insertAdjacentHTML('beforeend', markup);
}

export function findedObjectsRender(obj) {
  const markup = searchedObjListMarkup(obj);
  refs.output.insertAdjacentHTML('beforeend', markup);
}

export function loadAnimationOn() {
  refs.loadAnimation.classList.remove('bowlG_close');
  cleanPage(refs.output);
}

export function loadAnimationOff() {
  refs.loadAnimation.classList.add('bowlG_close');
}
