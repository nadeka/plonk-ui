import * as types from '../constants/actionTypes';

// Some browsers do not natively support fetch API
import fetch from 'isomorphic-fetch';

const API_BASE_URL = require('../constants/urls').API_BASE_URL;

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

export function fetchingChannels() {
  return {
    type: types.FETCHING_CHANNELS
  }
}

//TODO fetch only when not in state
export function fetchChannels() {
  return function (dispatch) {
    dispatch(fetchingChannels());

    let url = API_BASE_URL + `/channels`;

    return fetch(url, {
      method: 'GET',
      credentials: 'include'
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

export function fetchChannelsError() {
  return {
    type: types.FETCH_CHANNELS_ERROR
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

    return fetch(url, {
      method: 'POST',
      credentials: 'include'
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
      'Content-Type': 'application/json'
    };

    let payload = {
      name: name,
      private: false
    };

    return fetch(url, {
      method: 'POST',
      headers: headers,
      credentials: 'include',
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
