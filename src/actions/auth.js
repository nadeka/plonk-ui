import * as types from '../constants/actionTypes';
import { normalize } from 'normalizr';
import { user } from './schemas';
import { openConnection, closeConnection } from './websocket';

// Some browsers do not natively support fetch API
import fetch from 'isomorphic-fetch';

const API_BASE_URL = require('../constants/urls').API_BASE_URL;

export function verifyToken() {
  return function(dispatch) {
    let url = API_BASE_URL + `/reauthenticate`;

    return fetch(url, {
      method: 'POST',
      credentials: 'include'
    }).then(function(res) {
      if (res.ok) {
        res.json()
          .then(function(json) {
            dispatch(openConnection(json));
            dispatch(authenticateSuccess(normalize(json, user), json.id));
          })
      } else {
        dispatch(closeConnection());
        dispatch(authenticateError());
      }
    })
      .catch(err => console.log(err));
  }
}

export function authenticateUser(payload) {
  return function(dispatch) {
    let url = API_BASE_URL + `/login`;

    let headers = {
      'Content-Type': 'application/json'
    };

    return fetch(url, {
      method: 'POST',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify(payload)
    }).then(function(res) {
      if (res.ok) {
        res.json()
          .then(function(json) {
            dispatch(openConnection(json));
            dispatch(authenticateSuccess(normalize(json, user), json.id));
          })
      } else {
        dispatch(closeConnection());
        dispatch(authenticateError());
      }
    })
      .catch(err => console.log(err));
  }
}

export function authenticateSuccess(json, userid) {
  return {
    type: types.AUTHENTICATE_SUCCESS,
    entities: json.entities,
    userLoggedIn: userid
  }
}

export function authenticateError() {
  return {
    type: types.AUTHENTICATE_ERROR
  }
}

export function registerUser(payload) {
  return function(dispatch) {
    let url = API_BASE_URL + `/register`;

    let headers = {
      'Content-Type': 'application/json'
    };

    return fetch(url, {
      method: 'POST',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify(payload)
    }).then(function(res) {
      if (res.ok) {
        res.json()
          .then(function(json) {
            dispatch(openConnection(json));
            dispatch(registerSuccess(normalize(json, user), json.id));
          })
      } else {
        dispatch(closeConnection());
        dispatch(registerError());
      }
    })
      .catch(err => console.log(err));
  }
}

export function registerSuccess(json, userid) {
  return {
    type: types.REGISTER_SUCCESS,
    entities: json.entities,
    userLoggedIn: userid
  }
}

export function registerError() {
  return {
    type: types.REGISTER_ERROR
  }
}

export function logOut() {
  return function(dispatch) {
    let url = API_BASE_URL + `/logout`;

    return fetch(url, {
      method: 'POST',
      credentials: 'include'
    }).then(function(res) {
      dispatch(closeConnection());
      dispatch(logoutSuccess());
    })
      .catch(err => console.log(err));
  }
}

export function logoutSuccess() {
  return {
    type: types.LOGOUT_SUCCESS
  }
}
