import { normalize, arrayOf } from 'normalizr';
import { channel, message, receivedInvitation } from './schemas';
import cookie from 'react-cookie';
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
export function openConnection(userid) {
  return function(dispatch) {
    client.onDisconnect = function(willReconnect, log) {
      console.log(willReconnect);
      console.log(log);
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
          console.log(err);
          // TODO error handling for ws connections
          // dispatch(connectionError());
        }
        else {
          dispatch(connectionSuccess(userid));
        }
      });
  }
}

export function closeConnection() {
  return function(dispatch) {
    client.subscriptions().forEach(sub => client.unsubscribe(sub, null, function(err) {
      console.log(err);
    }));

    client.disconnect();
  }
}

//TODO refactor
export function connectionSuccess(userid) {
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

    client.subscribe('/new-channel', function (newChannel, flags) {
      dispatch(receiveChannelSuccess(normalize(newChannel, channel)));
    }, function (err) {
      console.log(err);
    });

    // TODO only listen to new messages in joined channels
    client.subscribe('/new-message', function (newMessage, flags) {
      let entities = normalize(newMessage, message);

      // TODO better solution for notifications on unread messages
      entities.entities.channelsWithNewMessages = {};

      entities.entities.channelsWithNewMessages[newMessage.channelid] = newMessage.channelid;

      dispatch(receiveMessageSuccess(entities));
    }, function (err) {
      console.log(err);
    });


    // TODO only listen to new members in joined channels
    client.subscribe('/user-joined', function (updatedChannel, flags) {
      dispatch(receiveMemberSuccess(normalize(updatedChannel, channel)));
    }, function (err) {
      console.log(err);
    });

    client.subscribe(`/users/${userid}/invitations`, function (newInvitation, flags) {
      dispatch(receiveInviteSuccess(normalize(newInvitation, receivedInvitation)));
    }, function (err) {
      console.log(err);
    });
  };
}
