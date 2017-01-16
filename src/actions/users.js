import * as types from '../constants/actionTypes';

// Some browsers do not natively support fetch API
import fetch from 'isomorphic-fetch';

const API_BASE_URL = require('../constants/urls').API_BASE_URL;

export function fetchReceivedInvitationsError() {
  return {
    type: types.FETCH_RECEIVED_INVITATIONS_ERROR
  }
}

export function fetchReceivedInvitationsSuccess(json) {
  return {
    type: types.FETCH_RECEIVED_INVITATIONS_SUCCESS,
    entities: json.entities
  }
}
