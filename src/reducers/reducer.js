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
  channels: [],
  receivedInvitations: [],
  snackbar: {
    open: false,
    type: '',
    message: ''
  }
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
      return _.merge({}, state, {
        snackbar: {
          open: true,
          type: 'success',
          message: 'Successfully joined channel'
        }
      });

    case types.RECEIVE_MEMBER_SUCCESS:
      return _.merge({}, state, action.entities);

    case types.SEND_INVITE_SUCCESS:
      return _.merge({}, state, {
        snackbar: {
          open: true,
          type: 'success',
          message: 'Invite successfully sent'
        }
      });

    case types.SEND_INVITE_ERROR:
      return _.merge({}, state, {
        snackbar: {
          open: true,
          type: 'error',
          message: 'Invite could not be sent'
        }
      });

    case types.RECEIVE_INVITE_SUCCESS:
      return _.merge({}, state, action.entities, {
        snackbar: {
          open: true,
          type: 'success',
          message: 'You have received an invitation!'
        }
      });

    case types.ADD_MESSAGE_ERROR:
      return _.merge({}, state, {
        snackbar: {
          open: true,
          type: 'error',
          message: 'Could not send message'
        }
      });

    case types.RECEIVE_MESSAGE_SUCCESS:
      return _.merge({}, state, action.entities);

    case types.ADD_CHANNEL_SUCCESS:
      return Object.assign({}, state, {
        snackbar: {
          open: true,
          type: 'success',
          message: 'Successfully created channel'
        }
      });

    case types.ADD_CHANNEL_ERROR:
      return Object.assign({}, state, {
        snackbar: {
          open: true,
          type: 'error',
          message: 'Could not create channel'
        }
      });

    case types.RECEIVE_CHANNEL_SUCCESS:
      return _.merge({}, state, action.entities);

    case types.FETCH_CHANNELS_SUCCESS:
      return _.merge({}, state, action.entities);

    case types.AUTHENTICATE_SUCCESS:
      return _.merge({}, state, action.entities, {
        userLoggedIn: action.userLoggedIn,
        snackbar: {
          open: true,
          type: 'success',
          message: 'Successfully logged in'
        }
      });

    case types.AUTHENTICATE_ERROR:
      return Object.assign({}, state, {
        userLoggedIn: null,
        snackbar: {
          open: true,
          type: 'error',
          message: 'Authentication unsuccessful'
        }
      });

    case types.REGISTER_SUCCESS:
      return _.merge({}, state, action.entities, {
        userLoggedIn: action.userLoggedIn,
        snackbar: {
          open: true,
          type: 'success',
          message: 'Successfully registered'
        }
      });

    case types.REGISTER_ERROR:
      return Object.assign({}, state, {
        userLoggedIn: null,
        snackbar: {
          open: true,
          type: 'error',
          message: 'Registration unsuccessful'
        }
      });

    case types.LOGOUT_SUCCESS:
      return Object.assign({}, initialState, {
        snackbar: {
          open: true,
          type: 'success',
          message: 'Successfully logged out'
        }
      });

    case types.CLOSE_SNACKBAR:
      return Object.assign({}, state, {
        snackbar: {
          open: false,
          type: '',
          message: ''
        }
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
