import * as types from '../constants/actionTypes';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
var _ = require('lodash');

const initialState = {
  selectedChannel: null,
  userLoggedIn: null,
  channelsWithNewMessages: {},
  users: [],
  messages: [],
  channels: []
};

// TODO split reducer
function reducer(state = initialState, action) {
  switch (action.type) {

    case types.SELECT_CHANNEL:
      let copy = Object.assign({}, state.channelsWithNewMessages);
      delete copy[action.channel];
      delete copy[state.selectedChannel];

      return Object.assign({}, state, {
        selectedChannel: action.channel,
        channelsWithNewMessages: copy
      });

    case types.JOIN_SUCCESS:
      return _.merge({}, state, action.entities);

    case types.ADD_MESSAGE_SUCCESS:
      return _.merge({}, state, action.entities);

    case types.ADD_CHANNEL_SUCCESS:
      return _.merge({}, state, action.entities);

    case types.FETCH_CHANNELS_SUCCESS:
      return _.merge({}, state, action.entities);

    case types.FETCH_USERS_SUCCESS:
      return _.merge({}, state, action.entities);

    case types.AUTHENTICATE_SUCCESS:
      return Object.assign({}, state, {
        userLoggedIn: action.userLoggedIn,
      });

    case types.AUTHENTICATE_ERROR:
      return Object.assign({}, state, {
        userLoggedIn: null
      });

    case types.REGISTER_SUCCESS:
      return _.merge({}, state, action.entities, { userLoggedIn: action.userLoggedIn });

    case types.REGISTER_ERROR:
      return Object.assign({}, state, {
        userLoggedIn: null
      });

    case types.LOGOUT_SUCCESS:
      return _.merge({}, state, { userLoggedIn: null });

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  reducer,
  routing: routerReducer,
  form: formReducer
});

export default rootReducer
