import * as types from '../constants/actionTypes';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
var _ = require('lodash');

const initialState = {
  selectedChannel: null,
  userLoggedIn: null,
  isLoading: true,
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

    case types.JOINING_CHANNEL:
      return Object.assign({}, state, {
        isLoading: true
      });

    case types.JOIN_SUCCESS:
      return _.merge({}, state, action.entities, { isLoading: false });

    case types.JOIN_ERROR:
      return Object.assign({}, state, {
        isLoading: false
      });

    case types.ADDING_MESSAGE:
      return Object.assign({}, state, {
        isLoading: true
      });

    case types.ADD_MESSAGE_SUCCESS:
      return _.merge({}, state, action.entities, { isLoading: false });

    case types.ADD_MESSAGE_ERROR:
      return Object.assign({}, state, {
        isLoading: false
      });

    case types.ADDING_CHANNEL:
      return Object.assign({}, state, {
        isLoading: true
      });

    case types.ADD_CHANNEL_SUCCESS:
      return _.merge({}, state, action.entities, { isLoading: false });

    case types.ADD_CHANNEL_ERROR:
      return Object.assign({}, state, {
        isLoading: false
      });

    case types.FETCHING_CHANNELS:
      return Object.assign({}, state, {
        isLoading: true
      });

    case types.FETCH_CHANNELS_SUCCESS:
      return _.merge({}, state, action.entities, { isLoading: false });

    case types.FETCH_CHANNELS_ERROR:
      return Object.assign({}, state, {
        isLoading: false
      });

    case types.FETCHING_USERS:
      return Object.assign({}, state, {
        isLoading: true
      });

    case types.FETCH_USERS_SUCCESS:
      return _.merge({}, state, action.entities, { isLoading: false });

    case types.FETCH_USERS_ERROR:
      return Object.assign({}, state, {
        isLoading: false
      });

    case types.AUTHENTICATING_USER:
      return Object.assign({}, state, {
        isLoading: true
      });

    case types.AUTHENTICATE_SUCCESS:
      return Object.assign({}, state, {
        userLoggedIn: action.userLoggedIn,
        isLoading: false
      });

    case types.AUTHENTICATE_ERROR:
      return Object.assign({}, state, {
        userLoggedIn: null,
        isLoading: false
      });

    case types.REGISTERING_USER:
      return Object.assign({}, state, {
        isLoading: true
      });

    case types.REGISTER_SUCCESS:
      return _.merge({}, state, action.entities, { isLoading: false, userLoggedIn: action.userLoggedIn });

    case types.REGISTER_ERROR:
      return Object.assign({}, state, {
        userLoggedIn: null,
        isLoading: false
      });

    case types.LOGGING_OUT:
      return Object.assign({}, state, {
        isLoading: true
      });

    case types.LOGOUT_SUCCESS:
      return _.merge({}, state, { isLoading: false, userLoggedIn: null });

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
