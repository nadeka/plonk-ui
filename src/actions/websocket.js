import { normalize, arrayOf } from 'normalizr';
import { channel, message, receivedInvitation } from './schemas';
import cookie from 'react-cookie';
import {
  fetchReceivedInvitationsError,
  fetchReceivedInvitationsSuccess
} from './users';
import {
  fetchChannelsSuccess,
  fetchChannelsError,
  receiveChannelSuccess,
  receiveMemberSuccess,
  receiveMessageSuccess,
  receiveInviteSuccess
} from './channels';
import Nes from 'nes/client';

const client = new Nes.Client(require('../constants/urls').WS_BASE_URL);

// TODO use ws for adding channels and messages etc
export function openConnection(user) {
  return function(dispatch) {
    // TODO think about what to show user on disconnect/error
    client.onDisconnect = function(willReconnect, log) {
      dispatch(connectionError());
    };

    client.onError = function(err) {
      dispatch(connectionError());
    };

    client.connect({
      auth: {
        headers: {
          'Cookie': 'accessToken=' + cookie.load('accessToken')
        }
      },
      reconnect: false
    }, function(err) {
        if (err) {
          dispatch(connectionError());
        }
        else {
          dispatch(connectionSuccess(user));
        }
      });
  }
}

export function closeConnection() {
  return function(dispatch) {
    client.subscriptions().forEach(sub => client.unsubscribe(sub, null, function(err) {
      if (err) {
        console.log(err);
      }
    }));

    client.disconnect();
  }
}

export function connectionError() {
  return function(dispatch) {
    client.disconnect();
  }
}

export function connectionSuccess(user) {
  return function(dispatch) {
    dispatch(fetchChannels());
    dispatch(fetchChannelsOfUser());
    dispatch(fetchReceivedInvitationsOfUser());
    dispatch(subscribeToNewChannels());
    dispatch(subscribeToNewInvitations(user.id));
  };
}

export function fetchChannels() {
  return function(dispatch) {
    client.request({
      path: '/channels',
      headers: {
        'Cookie': 'accessToken=' + cookie.load('accessToken')
      }
    }, function (err, channels) {
      if (err) {
        console.log(err);
        dispatch(fetchChannelsError());
      }
      else {
        dispatch(fetchChannelsSuccess(normalize(channels, arrayOf(channel))));
      }
    });
  }
}

export function fetchChannelsOfUser() {
  return function(dispatch) {
    client.request({
      path: `/user/channels`,
      headers: {
        'Cookie': 'accessToken=' + cookie.load('accessToken')
      }
    }, function (err, channels) {
      if (err) {
        console.log(err);
        dispatch(fetchChannelsError());
      }
      else {
        channels.forEach(channel => function() {
          dispatch(subscribeToNewMessages(channel.id));
          dispatch(subscribeToNewMembers(channel.id));
        });

        dispatch(fetchChannelsSuccess(normalize(channels, arrayOf(channel))));
      }
    });
  }
}

export function fetchReceivedInvitationsOfUser() {
  return function(dispatch) {
    client.request({
      path: `/user/receivedInvitations`,
      headers: {
        'Cookie': 'accessToken=' + cookie.load('accessToken')
      }
    }, function (err, invitations) {
      if (err) {
        console.log(err);
        dispatch(fetchReceivedInvitationsError());
      }
      else {
        dispatch(fetchReceivedInvitationsSuccess(normalize(invitations, arrayOf(receivedInvitation))));
      }
    });
  }
}

export function subscribeToNewMessages(channelid) {
  return function(dispatch) {
    client.subscribe(`/channels/${channelid}/new-message`, function (newMessage, flags) {
      let entities = normalize(newMessage, message);

      // TODO better solution for notifications on unread messages
      entities.entities.channelsWithNewMessages = {};

      entities.entities.channelsWithNewMessages[newMessage.channelid] = newMessage.channelid;

      dispatch(receiveMessageSuccess(entities));
    }, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
}

export function subscribeToNewMembers(channelid) {
  return function(dispatch) {
    client.subscribe(`/channels/${channelid}/new-member`, function (updatedChannel, flags) {
      dispatch(receiveMemberSuccess(normalize(updatedChannel, channel)));
    }, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
}

export function subscribeToNewChannels() {
  return function(dispatch) {
    client.subscribe('/new-channel', function (newChannel, flags) {
      dispatch(receiveChannelSuccess(normalize(newChannel, channel)));
    }, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
}

export function subscribeToNewInvitations(userid) {
  return function(dispatch) {
    client.subscribe(`/users/${userid}/invitations`, function (newInvitation, flags) {
      dispatch(receiveInviteSuccess(normalize(newInvitation, receivedInvitation)));
    }, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
}
