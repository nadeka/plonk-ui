import React from 'react';
import { ListItem } from 'material-ui/List';
import NotificationsIcon from 'material-ui/svg-icons/av/fiber-manual-record';

const unreadMessagesIcon = {
  width: 10,
  height: 10,
  padding: 8
};

class ChannelListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListItem
        style={this.props.channel.id === this.props.selectedChannel ? {color: '#4FC3F7'} : {color: '#fff'}}
        onClick={() => this.props.selectChannel(this.props.channel.id)}
        primaryText={'#' + this.props.channel.name}
        rightIcon={
          this.channelHasNewMessagesAndIsNotSelected(this.props.channel) ?
            <NotificationsIcon
              color={'#33D0D0'}
              style={unreadMessagesIcon}
            />
            :
            null
        }
      />
    )
  }

  channelHasNewMessagesAndIsNotSelected(channel) {
    return this.props.channelsWithNewMessages[channel.id] && channel.id !== this.props.selectedChannel;
  }
}

export default ChannelListItem;
