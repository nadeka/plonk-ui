import * as types from '../constants/actionTypes';
import { normalize } from 'normalizr';
import { user } from './schemas';
import { openConnection, closeConnection } from './websocket';

// Some browsers do not natively support fetch API
import fetch from 'isomorphic-fetch';

const API_BASE_URL = require('../constants/urls').API_BASE_URL;

export function verifyingToken() {
  return {
    type: types.VERIFYING_TOKEN
  }
}

export function verifyToken() {
  return function(dispatch) {
    dispatch(verifyingToken());

    let url = API_BASE_URL + `/reauthenticate`;

    return fetch(url, {
      method: 'POST',
      credentials: 'include'
    }).then(function(res) {
      if (res.ok) {
        res.json()
          .then(function(json) {
            dispatch(authenticateSuccess(json.id));
            dispatch(openConnection());
          })
      } else {
        dispatch(authenticateError());
        dispatch(closeConnection());
      }
    })
      .catch(err => console.log(err));
  }
}

export function authenticatingUser() {
  return {
    type: types.AUTHENTICATING_USER
  }
}

export function authenticateUser(payload) {
  return function(dispatch) {
    dispatch(authenticatingUser());

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
            dispatch(authenticateSuccess(json.id));
            dispatch(openConnection());
          })
      } else {
        dispatch(authenticateError());
        dispatch(closeConnection());
      }
    })
      .catch(err => console.log(err));
  }
}

export function authenticateSuccess(userid) {
  return {
    type: types.AUTHENTICATE_SUCCESS,
    userLoggedIn: userid
  }
}

export function authenticateError() {
  return {
    type: types.AUTHENTICATE_ERROR
  }
}

export function registeringUser() {
  return {
    type: types.REGISTERING_USER
  }
}

export function registerUser(payload) {
  return function(dispatch) {
    dispatch(registeringUser());

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
            dispatch(registerSuccess(normalize(json, user), json.id));
            dispatch(openConnection());
          })
      } else {
        dispatch(registerError());
        dispatch(closeConnection());
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

export function loggingOut() {
  return {
    type: types.LOGGING_OUT
  }
}

export function logOut() {
  return function(dispatch) {
    dispatch(loggingOut());

    let url = API_BASE_URL + `/logout`;

    return fetch(url, {
      method: 'POST',
      credentials: 'include'
    }).then(function(res) {
      dispatch(logoutSuccess());
      dispatch(closeConnection());
    })
      .catch(err => console.log(err));
  }
}

export function logoutSuccess() {
  return {
    type: types.LOGOUT_SUCCESS
  }
}
