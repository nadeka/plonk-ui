import * as types from '../constants/actionTypes';

// Some browsers do not natively support fetch API
import fetch from 'isomorphic-fetch';

const API_BASE_URL = require('../constants/urls').API_BASE_URL;

export function fetchingUsers() {
  return {
    type: types.FETCHING_USERS
  }
}

export function fetchUsers() {
  return function (dispatch) {
    dispatch(fetchingUsers());

    let url = API_BASE_URL + `/users`;

    return fetch(url, {
      method: 'GET'
    }).then(function (res) {
      if (res.ok) {
        // res.json()
        //   .then(function(json) {
        //     dispatch(fetchUsersSuccess(normalize(json, arrayOf(user))));
        //   });
      } else {
        dispatch(fetchUsersError());
      }
    })
      .catch(err => console.log(err));
  }
}

export function fetchUsersSuccess(json) {
  return {
    type: types.FETCH_USERS_SUCCESS,
    entities: json.entities
  }
}

export function fetchUsersError(json) {
  return {
    type: types.FETCH_USERS_ERROR,
    entities: json.entities
  }
}
