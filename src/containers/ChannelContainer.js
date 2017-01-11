import React from 'react';
import { connect } from 'react-redux';
import MessageList from '../components/MessageList';
import UserList from '../components/UserList';
import { joinChannel } from '../actions/channels';
import FlatButton from 'material-ui/FlatButton';

export class ChannelContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.selectedChannel) {
      return(
        <p>Welcome!</p>
      );
    }

    if (this.props.selectedChannel.users.find(user => user === this.props.userLoggedIn)) {
      return(
        <div className="channel-page">
          <MessageList {...this.props} />
          <UserList {...this.props} />
        </div>
      );
    }

    return(
      <div className="channel-page">
        <div className="join-button">
          <FlatButton
            style={{backgroundColor: '#fff', color: '#000'}}
            label={"Join " + this.props.selectedChannel.name}
            onClick={() => this.props.joinChannel(this.props.selectedChannel.id)}>
          </FlatButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // Find messages of selected channel and attach sender name to each message
    messages: Object.values(state.reducer.messages)
      .filter(message => message.channelid === state.reducer.selectedChannel)
      .map(message => Object.assign({}, message, {sender: state.reducer.users[message.userid].name})),

    selectedChannel: state.reducer.selectedChannel ? state.reducer.channels[state.reducer.selectedChannel] : null,
    userLoggedIn: state.reducer.userLoggedIn,
    channels: state.reducer.channels,

    // Find users of selected channel
    users:  Object.values(state.reducer.users)
      .filter(user => state.reducer.channels[state.reducer.selectedChannel] &&
      state.reducer.channels[state.reducer.selectedChannel].users.find(u => u === user.id))
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    joinChannel: (id) => {
      dispatch(joinChannel(id))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelContainer);
