import * as types from '../constants/actionTypes';
import { normalize, Schema, arrayOf } from 'normalizr';
import cookie from 'react-cookie';

// Some browsers do not natively support fetch API
import fetch from 'isomorphic-fetch';

const API_BASE_URL =
  process.env.NODE_ENV !== 'production' ?
    'http://localhost:6001' :
    'http://plonk.eu-west-1.elasticbeanstalk.com';

// Define schemas for entities
const channel = new Schema('channels');
const message = new Schema('messages');
const user = new Schema('users');

// Define nesting rules for schemas
channel.define({
  messages: arrayOf(message),
  users: arrayOf(user)
});

message.define({
  sender: user,
  channel: channel
});

user.define({
  channels: arrayOf(channel),
  messages: arrayOf(message)
});

// Actions
export function selectChannel(channel) {
  return {
    type: types.SELECT_CHANNEL,
    channel
  }
}

export function requestMessages(channel) {
  return {
    type: types.REQUEST_MESSAGES,
    channel
  }
}

export function fetchMessages(channel) {
  return function(dispatch) {
    dispatch(requestMessages(channel));

    let url = API_BASE_URL + `/channels/${channel}/messages`;

    let headers = {
      'authorization': 'Bearer ' + cookie.load('login_info').token
    };

    return fetch(url, {
        method: 'GET',
        headers: headers
    }).then(res => res.json())
      .then(messages => console.log(messages))
      .then(messages => dispatch(receiveMessages(channel, normalize(messages, arrayOf(message)))))
      .catch(err => console.log(err));
  }
}

export function receiveMessages(channel, json) {
  return {
    type: types.RECEIVE_MESSAGES,
    channel,
    entities: json.entities
  }
}

export function requestChannels() {
  return {
    type: types.REQUEST_CHANNELS
  }
}

export function fetchChannels() {
  return function(dispatch) {
    dispatch(requestChannels());

    let url = API_BASE_URL + `/channels`;

    let headers = {
      'authorization': 'Bearer ' + cookie.load('login_info').token
    };

    return fetch(url, {
      method: 'GET',
      headers: headers
    }).then(res => res.json())
      .then(channels => dispatch(receiveChannels(normalize(channels, arrayOf(channel)))))
      .catch(err => console.log(err));
  }
}

export function receiveChannels(json) {
  return {
    type: types.RECEIVE_CHANNELS,
    entities: json.entities
  }
}

export function joiningChannel() {
  return {
    type: types.JOINING_CHANNEL
  }
}

export function joinChannel(channel) {
  return function(dispatch) {
    dispatch(joiningChannel());

    let url = API_BASE_URL + `/channels/${channel}/join`;

    let headers = {
      'authorization': 'Bearer ' + cookie.load('login_info').token
    };

    let payload = {
      userid: cookie.load('login_info').userid
    };

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: headers
    }).then(function(res) {
      if (res.ok) {
        dispatch(joinSuccess(channel, payload.userid));
      } else {
        dispatch(joinError());
      }
    })
      .catch(err => console.log(err));
  }
}

export function joinError(channel, user) {
  return {
    type: types.JOIN_ERROR,
    channel: channel,
    user: user
  }
}

export function joinSuccess(channel, user) {
  return {
    type: types.JOIN_SUCCESS,
    channel: channel,
    user: user
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
      body: JSON.stringify(payload)
    }).then(function(res) {
      if (res.ok) {
        res.json()
          .then(function(json) {
            cookie.save('login_info', JSON.stringify(json));
            dispatch(authenticateSuccess(json.userid));
          })
      } else {
        dispatch(authenticateError());
      }
      })
      .catch(err => console.log(err));
  }
}

export function authenticateSuccess(userId) {
  return {
    type: types.AUTHENTICATE_SUCCESS,
    userId: userId
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

    let url = API_BASE_URL + `/users`;

    let headers = {
      'Content-Type': 'application/json'
    };

    return fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    }).then(function(res) {
        if (res.ok) {
          res.json()
            .then(function(json) {
              cookie.save('login_info', JSON.stringify(json));
              dispatch(registerSuccess(json.userid));
            })
        } else {
          dispatch(registerError());
        }
      })
      .catch(err => console.log(err));
  }
}

export function registerSuccess(userId) {
  return {
    type: types.REGISTER_SUCCESS,
    userId: userId
  }
}

export function registerError() {
  return {
    type: types.REGISTER_ERROR
  }
}
