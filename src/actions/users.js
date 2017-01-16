import * as types from '../constants/actionTypes';

// Some browsers do not natively support fetch API
import fetch from 'isomorphic-fetch';

const API_BASE_URL = require('../constants/urls').API_BASE_URL;

export function deleteReceivedInvitation(invitationid) {
  return function(dispatch) {
    let url = API_BASE_URL + `/user/receivedInvitations/${invitationid}/delete`;

    return fetch(url, {
      method: 'POST',
      credentials: 'include'
    }).then(function(res) {
      if (res.ok) {
        res.json()
          .then(function(json) {
            dispatch(deleteReceivedInvitationSuccess(invitationid));
          })
      } else {
        dispatch(deleteReceivedInvitationError());
      }
    })
      .catch(err => console.log(err));
  }
}

export function deleteReceivedInvitationSuccess(invitationid) {
  return {
    type: types.DELETE_RECEIVED_INVITATION_SUCCESS,
    invitationid: invitationid
  }
}

export function deleteReceivedInvitationError() {
  return {
    type: types.DELETE_RECEIVED_INVITATION_ERROR
  }
}

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
