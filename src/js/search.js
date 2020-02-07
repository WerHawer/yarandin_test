'use strict';

import axios from 'axios';
import getApi from './getAPI';
import { loadAnimationOn, oneObjRender } from './render';

export async function findObjByTap(e) {
  const target = e.target;
  const url = target.dataset.url;

  if (!url) return;

  loadAnimationOn();
  const oneObj = await getApi.searchDetails(url);
  oneObjRender(oneObj, target);
}

export async function getInfo(obj) {
  const newObj = {};
  const objArr = Object.keys(obj);

  for (let key of objArr) {
    if (typeof obj[key] === 'object' && obj[key].length) {
      const names = obj[key].map(async path => {
        const info = await axios.get(path);
        const name = info.data.name || info.data.title;

        return { name, path };
      });
      const resultArr = await axios.all(names);
      newObj[key] = resultArr;
      console.log(resultArr);
    } else if (typeof obj[key] === 'object' && !obj[key].length) {
      newObj[key] = undefined;
    } else if (key === 'homeworld') {
      const path = obj[key];
      const info = await axios.get(path);
      const name = info.data.name;

      newObj[key] = { name, path };
    } else {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}
