'use strict';

const API_URL = 'https://mate-academy.github.io/phone-catalogue-static/api/';

const PhonesService = {
  getAll({query='', order=''} = {}) {
      return fetch(API_URL + '/phones.json').then((response) => response.json());
  },
  getById(id) {
    return fetch(API_URL + '/phones/' + id + '.json').then((response) => response.json());
  }
}

export default PhonesService;
