import { Schema, arrayOf } from 'normalizr';

// Define schemas for entities
const channel = new Schema('channels');
const message = new Schema('messages');
const user = new Schema('users');

// Define nesting rules for schemas
channel.define({
  messages: arrayOf(message),
  users: arrayOf(user)
});

message.define({
  sender: user,
  channel: channel
});

user.define({
  channels: arrayOf(channel),
  messages: arrayOf(message)
});

module.exports = {
  channel: channel,
  message: message,
  user: user
};
