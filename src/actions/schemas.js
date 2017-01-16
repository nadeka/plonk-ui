import { Schema, arrayOf } from 'normalizr';

// Define schemas for entities
const channel = new Schema('channels');
const message = new Schema('messages');
const user = new Schema('users');
const receivedInvitation = new Schema('receivedInvitations');

// Define nesting rules for schemas
channel.define({
  messages: arrayOf(message),
  users: arrayOf(user)
});

user.define({
  channels: arrayOf(channel),
  messages: arrayOf(message),
  receivedInvitations: arrayOf(receivedInvitation)
});

module.exports = {
  channel: channel,
  message: message,
  user: user,
  receivedInvitation: receivedInvitation
};
