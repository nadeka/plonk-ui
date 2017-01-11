import React from 'react';
import AddChannelDialog from './AddChannelDialog';
import { Scrollbars } from 'react-custom-scrollbars';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChannelListItem from './ChannelListItem';

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="channel-list">
        {this.renderChannelListHeader()}
        {this.renderScrollArea()}
      </div>
    );
  }

  renderChannelListHeader() {
    return (
      <div className="channel-list-header">
        <p className="channel-list-title">
          Channels ({this.props.joinedChannels.length + this.props.nonJoinedChannels.length})
        </p>
        <AddChannelDialog />
      </div>
    )
  }

  renderScrollArea() {
    return (
      <Scrollbars
        renderThumbVertical={({ style, ...props }) =>
          <div {...props} style={{ ...style, backgroundColor: '#fff' }}/>
        }>
        {this.renderChannelList()}
      </Scrollbars>
    )
  }

  renderChannelList() {
    return (
      <List>
        {this.renderJoinedChannels()}
        {this.renderNonJoinedChannels()}
      </List>
    )
  }

  renderJoinedChannels() {
    return (
      this.props.joinedChannels.length < 1 ?
        null
        :
        <div>
          <p className="channel-list-joined-subheader">
            Joined channels ({this.props.joinedChannels.length})
          </p>

          {this.props.joinedChannels.map(channel => this.renderChannelListItem(channel))}

          <Divider
            style={{background: '#fff', margin: '8px'}}
          />
        </div>
    )
  }

  renderNonJoinedChannels() {
    return (
      this.props.nonJoinedChannels.length < 1 ?
        <p>No more channels to join.</p>
        :
        this.props.nonJoinedChannels.map(channel => this.renderChannelListItem(channel))
    )
  }

  renderChannelListItem(channel) {
    return (
      <ChannelListItem
        key={channel.id}
        channel={channel}
        selectedChannel={this.props.selectedChannel}
        selectChannel={this.props.selectChannel}
        channelsWithNewMessages={this.props.channelsWithNewMessages}
      />
    )
  }
}

export default ChannelList;
