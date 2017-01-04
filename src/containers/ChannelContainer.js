import React from 'react';
import { connect } from 'react-redux';
import MessageList from '../components/MessageList';
import UserList from '../components/UserList';
import { joinChannel } from '../actions/channels';
import FlatButton from 'material-ui/FlatButton';

const joinButtonStyle = {
  color: '#33D033'
};

export class ChannelContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isLoading,
      selectedChannel,
      joinChannel,
      userLoggedIn,
      messages,
      channels
    } = this.props;

    if (isLoading || !selectedChannel) {
      return(
        <div></div>
      );
    }

    if (!this.userBelongsToChannel(userLoggedIn, channels[selectedChannel])) {
      return(
        <div className="join-button">
          <FlatButton
            labelStyle={joinButtonStyle}
            label={"Join " + channels[selectedChannel].name}
            onClick={() => joinChannel(selectedChannel)}>
          </FlatButton>
        </div>
      );
    }

    return(
      <div className="channel-page">
        <MessageList {...this.props} />
        <UserList {...this.props} />
      </div>
    );
  }

  userBelongsToChannel(userLoggedIn, channel) {
    return channel && channel.users && channel.users.find(id => id === userLoggedIn);
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.reducer.messages,
    selectedChannel: state.reducer.selectedChannel,
    userLoggedIn: state.reducer.userLoggedIn,
    channels: state.reducer.channels,
    users: state.reducer.users,
    isLoading: state.reducer.isLoading
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
