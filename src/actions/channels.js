import * as types from '../constants/actionTypes';
import { normalize } from 'normalizr';
import { channel, message } from './schemas';
import { subscribeToNewMembers, subscribeToNewMessages } from './websocket';

// Some browsers do not natively support fetch API
import fetch from 'isomorphic-fetch';

const API_BASE_URL = require('../constants/urls').API_BASE_URL;

export function selectChannel(channel) {
  return {
    type: types.SELECT_CHANNEL,
    channel
  }
}

export function addMessage(content, channelid) {
  return function(dispatch) {
    let url = API_BASE_URL + `/channels/${channelid}/messages`;

    let headers = {
      'Content-Type': 'application/json'
    };

    let payload = {
      content: content
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
            dispatch(addMessageSuccess(normalize(json, message)));
          });
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

export function receiveMessageSuccess(json) {
  return {
    type: types.RECEIVE_MESSAGE_SUCCESS,
    entities: json.entities
  }
}

export function fetchChannelsSuccess(json) {
  return {
    type: types.FETCH_CHANNELS_SUCCESS,
    entities: json.entities
  }
}

export function fetchChannelsError() {
  return {
    type: types.FETCH_CHANNELS_ERROR
  }
}

export function joinChannel(channelid) {
  return function(dispatch) {
    let url = API_BASE_URL + `/channels/${channelid}/join`;

    return fetch(url, {
      method: 'POST',
      credentials: 'include'
    }).then(function(res) {
      if (res.ok) {
        res.json()
          .then(function(json) {
            dispatch(subscribeToNewMembers(channelid));
            dispatch(subscribeToNewMessages(channelid));
            dispatch(joinSuccess(normalize(json, channel)));
          })
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

export function receiveMemberSuccess(json) {
  return {
    type: types.RECEIVE_MEMBER_SUCCESS,
    entities: json.entities
  }
}

export function addChannel(values) {
  return function(dispatch) {
    let url = API_BASE_URL + `/channels`;

    let headers = {
      'Content-Type': 'application/json'
    };

    let payload = {
      name: values.name,
      private: values.private
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
            dispatch(addChannelSuccess(normalize(json, channel)));
            dispatch(joinChannel(json.id));
          })
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

export function receiveChannelSuccess(json) {
  return {
    type: types.RECEIVE_CHANNEL_SUCCESS,
    entities: json.entities
  }
}

export function inviteUser(values, channelid) {
  return function(dispatch) {
    let url = API_BASE_URL + `/channels/${channelid}/invite`;

    let headers = {
      'Content-Type': 'application/json'
    };

    let payload = {
      inviteename: values.inviteename,
      message: values.message
    };

    return fetch(url, {
      method: 'POST',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify(payload)
    }).then(function(res) {
      if (res.ok) {
        dispatch(sendInviteSuccess());
      } else {
        dispatch(sendInviteError());
      }
    })
      .catch(err => console.log(err));
  }
}

export function sendInviteSuccess() {
  return {
    type: types.SEND_INVITE_SUCCESS
  }
}

export function sendInviteError() {
  return {
    type: types.SEND_INVITE_ERROR
  }
}

export function receiveInviteSuccess(json) {
  return {
    type: types.RECEIVE_INVITE_SUCCESS,
    entities: json.entities
  }
}
