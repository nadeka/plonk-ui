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
    const {
      selectedChannel,
      joinChannel,
      userLoggedIn,
      channels
    } = this.props;

    if (!selectedChannel) {
      return(
        <p>Welcome!</p>
      );
    }

    if (this.userBelongsToChannel(userLoggedIn, channels[selectedChannel])) {
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
            label={"Join " + channels[selectedChannel].name}
            onClick={() => joinChannel(selectedChannel)}>
          </FlatButton>
        </div>
      </div>
    );
  }

  userBelongsToChannel(userLoggedIn, channel) {
    return channel && channel.users && channel.users.find(id => id === userLoggedIn);
  }
}

const mapStateToProps = (state) => {
  return {
    // Find messages of selected channel and attach sender name to each message
    messages: Object.values(state.reducer.messages)
      .filter(message => message.channelid === state.reducer.selectedChannel)
      .map(message => Object.assign({}, message, {sender: state.reducer.users[message.userid].name})),

    selectedChannel: state.reducer.selectedChannel,
    userLoggedIn: state.reducer.userLoggedIn,
    channels: state.reducer.channels,
    users: state.reducer.users
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
