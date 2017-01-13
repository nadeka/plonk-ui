import React from 'react';
import { connect } from 'react-redux';
import ChannelList from '../components/ChannelList';
import { selectChannel } from '../actions/channels';

export class ChannelListContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <ChannelList {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    joinedChannels: Object.values(state.reducer.channels)
      .filter(channel => channel.users && channel.users.find(id => id === state.reducer.userLoggedIn)),

    nonJoinedChannels: Object.values(state.reducer.channels).filter(channel => channel
    && (!channel.users || !channel.users.find(id => id === state.reducer.userLoggedIn))),

    selectedChannel: state.reducer.selectedChannel,
    channelsWithNewMessages: state.reducer.channelsWithNewMessages
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectChannel: (channel) => {
      dispatch(selectChannel(channel));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelListContainer);
