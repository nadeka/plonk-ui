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

// TODO split actions
export function openConnection(client) {
  return function(dispatch) {
    client.connect({ auth: { headers: { authorization: 'Bearer ' + cookie.load('login_info').token } } }, function (err) {
      // TODO handle errors
      dispatch(connectionSuccess(client));
    });
  }
}

export function connectionSuccess(client) {
  return function(dispatch) {
    client.request('/channels', function (err, channels) {
      dispatch(fetchChannelsSuccess(normalize(channels, arrayOf(channel))));
    });

    client.subscribe('/new-channel', function (newChannel, flags) {
      dispatch(addChannelSuccess(normalize(newChannel, channel)));
    }, function (err) { });

    client.subscribe('/new-message', function (newMessage, flags) {
      dispatch(addMessageSuccess(normalize(newMessage, message)));
    }, function (err) { });

    client.subscribe('/user-joined', function (updatedChannel, flags) {
      dispatch(joinSuccess(normalize(updatedChannel, channel)));
    }, function (err) { });
  };
}

// Actions
export function selectChannel(channel) {
  return {
    type: types.SELECT_CHANNEL,
    channel
  }
}

export function addingMessage() {
  return {
    type: types.ADDING_MESSAGE
  }
}

export function addMessage(content, channelid) {
  return function(dispatch) {
    dispatch(addingMessage());

    let url = API_BASE_URL + `/channels/${ channelid }/messages`;

    let headers = {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + cookie.load('login_info').token
    };

    let payload = {
      content: content
    };

    return fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    }).then(function(res) {
      if (res.ok) {
        // res.json()
        //   .then(function(json) {
        //     dispatch(addMessageSuccess(normalize(json, message)));
        //   })
      } else {
        dispatch(addMessageError());
      }
    })
      .catch(err => console.log(err));
  }
}

export function addMessageSuccess(json) {
  return {
    type: types.ADD_MESSAGE_SUCCESS,
    entities: json.entities
  }
}

export function addMessageError() {
  return {
    type: types.ADD_MESSAGE_ERROR
  }
}

export function requestChannels() {
  return {
    type: types.REQUEST_CHANNELS
  }
}

//TODO fetch only when not in state
export function fetchChannels() {
  return function (dispatch) {
    dispatch(requestChannels());

    let url = API_BASE_URL + `/channels`;

    let headers = {
      'authorization': 'Bearer ' + cookie.load('login_info').token
    };

    return fetch(url, {
      method: 'GET',
      headers: headers
    }).then(function (res) {
      if (res.ok) {
        // res.json()
        //   .then(function(json) {
        //     dispatch(fetchChannelsSuccess(normalize(json, arrayOf(channel))));
        //   });
      } else {
        dispatch(fetchChannelsError());
      }
    })
      .catch(err => console.log(err));
  }
}

export function fetchChannelsSuccess(json) {
  return {
    type: types.FETCH_CHANNELS_SUCCESS,
    entities: json.entities
  }
}

export function fetchChannelsError(json) {
  return {
    type: types.FETCH_CHANNELS_ERROR,
    entities: json.entities
  }
}

export function requestUsers() {
  return {
    type: types.REQUEST_USERS
  }
}

export function fetchUsers() {
  return function (dispatch) {
    dispatch(requestUsers());

    let url = API_BASE_URL + `/users`;

    let headers = {
      'authorization': 'Bearer ' + cookie.load('login_info').token
    };

    return fetch(url, {
      method: 'GET',
      headers: headers
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

export function joiningChannel() {
  return {
    type: types.JOINING_CHANNEL
  }
}

export function joinChannel(channelid) {
  return function(dispatch) {
    dispatch(joiningChannel());

    let url = API_BASE_URL + `/channels/${channelid}/join`;

    let headers = {
      'authorization': 'Bearer ' + cookie.load('login_info').token
    };

    return fetch(url, {
      method: 'POST',
      headers: headers
    }).then(function(res) {
      if (res.ok) {
        // res.json()
        //   .then(function(json) {
        //     dispatch(joinSuccess(normalize(json, channel)));
        //   });
      } else {
        dispatch(joinError());
      }
    })
      .catch(err => console.log(err));
  }
}

export function joinSuccess(json) {
  return {
    type: types.JOIN_SUCCESS,
    entities: json.entities
  }
}

export function joinError() {
  return {
    type: types.JOIN_ERROR
  }
}

export function addingChannel() {
  return {
    type: types.ADDING_CHANNEL
  }
}

export function addChannel(name) {
  return function(dispatch) {
    dispatch(addingChannel());

    let url = API_BASE_URL + `/channels`;

    let headers = {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + cookie.load('login_info').token
    };

    let payload = {
      name: name,
      private: false
    };

    return fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    }).then(function(res) {
      if (res.ok) {
        // res.json()
        //   .then(function(json) {
        //     dispatch(addChannelSuccess(normalize(json, channel)));
        //   })
      } else {
        dispatch(addChannelError());
      }
    })
      .catch(err => console.log(err));
  }
}

export function addChannelSuccess(json) {
  return {
    type: types.ADD_CHANNEL_SUCCESS,
    entities: json.entities
  }
}

export function addChannelError() {
  return {
    type: types.ADD_CHANNEL_ERROR
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
      body: JSON.stringify(payload)
    }).then(function(res) {
        if (res.ok) {
          res.json()
            .then(function(json) {
              cookie.save('login_info', JSON.stringify({ userid: json.user.id, token: json.token }));
              dispatch(registerSuccess(normalize(json.user, user), json.user.id));
            })
        } else {
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
