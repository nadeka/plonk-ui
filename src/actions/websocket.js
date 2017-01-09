import { normalize, arrayOf } from 'normalizr';
import { channel, message } from './schemas';
import cookie from 'react-cookie';
import {
  fetchChannelsSuccess,
  fetchChannelsError,
  addChannelSuccess,
  joinSuccess,
  addMessageSuccess
} from './channels';
import Nes from 'nes/client';

const client = new Nes.Client(require('../constants/urls').WS_BASE_URL);

export function openConnection() {
  return function(dispatch) {
    client.connect({
      auth: {
        headers: {
          'Cookie': 'accessToken=' + cookie.load('accessToken')
        }
      }
    }, function(err) {
        if (err) {
          console.log(err);
          // TODO error handling for ws connections
          // dispatch(connectionError());
        }
        else {
          dispatch(connectionSuccess());
        }
      });
  }
}

export function closeConnection() {
  return function(dispatch) {
    client.disconnect();
  }
}

//TODO refactor
export function connectionSuccess() {
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
      dispatch(addChannelSuccess(normalize(newChannel, channel)));
    }, function (err) {
      console.log(err);
    });

    client.subscribe('/new-message', function (newMessage, flags) {
      let entities = normalize(newMessage, message);

      // TODO better solution for notifications on unread messages
      entities.entities.channelsWithNewMessages = {};

      entities.entities.channelsWithNewMessages[newMessage.channelid] = newMessage.channelid;

      dispatch(addMessageSuccess(entities));
    }, function (err) {
      console.log(err);
    });

    client.subscribe('/user-joined', function (updatedChannel, flags) {
      dispatch(joinSuccess(normalize(updatedChannel, channel)));
    }, function (err) {
      console.log(err);
    });
  };
}
