import * as types from '../constants/actionTypes';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import merge from 'lodash/merge';

const initialState = {
  selectedChannel: 1,
  userLoggedIn: null,
  isLoading: true,
  users: [],
  messages: [],
  channels: []
};

function reducer(state = initialState, action) {
  switch (action.type) {

    case types.SELECT_CHANNEL:
      return Object.assign({}, state, {
        selectedChannel: action.channel
      });

    case types.JOINING_CHANNEL:
      return Object.assign({}, state, {
        isLoading: true
      });

    case types.JOIN_SUCCESS:
      return Object.assign({}, state, {
        selectedChannel: action.channel,
        isLoading: false
      });

    case types.JOIN_ERROR:
      return Object.assign({}, state, {
        isLoading: false
      });

    case types.REQUEST_MESSAGES:
      return Object.assign({}, state, {
        isLoading: true
      });

    case types.RECEIVE_MESSAGES:
      return merge({}, state, action.entities, { isLoading: false } );

    case types.REQUEST_CHANNELS:
      return Object.assign({}, state, {
        isLoading: true
      });

    case types.RECEIVE_CHANNELS:
      return merge({}, state, action.entities, { isLoading: false } );

    case types.AUTHENTICATE_USER:
      return Object.assign({}, state, {
        isLoading: true
      });

    case types.AUTHENTICATE_SUCCESS:
      return Object.assign({}, state, {
        userLoggedIn: action.userId,
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
      return Object.assign({}, state, {
        userLoggedIn: action.userId,
        isLoading: false
      });

    case types.REGISTER_ERROR:
      return Object.assign({}, state, {
        userLoggedIn: null,
        isLoading: false
      });

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
