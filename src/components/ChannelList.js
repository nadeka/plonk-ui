import React from 'react';
import AddChannelDialog from './AddChannelDialog';
import ScrollArea from 'react-scrollbar';
import { ListItem, List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import NotificationsIcon from 'material-ui/svg-icons/av/fiber-manual-record';

const unreadMessagesIcon = {
  width: 10,
  height: 10,
  padding: 8
};

const subheaderStyle = {
  fontSize: 18
};

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selectedChannel, channels, selectChannel, userLoggedIn, channelsWithNewMessages } = this.props;

    // TODO refactor
    return(
      <div className="channel-list">
        <Subheader style={subheaderStyle}>Channels</Subheader>
        <AddChannelDialog />
        <br/>
        <ScrollArea
          speed={0.8}
          className="channel-list-scroll-area"
          contentClassName="channel-list-content"
          horizontal={false}
          smoothScrolling={true}
        >
          <List>
            {
              Object.values(channels)
                .map(channel => channel && channel.users &&
                channel.users.find(id => id === userLoggedIn)
                  && channelsWithNewMessages[channel.id]
                  && channel.id !== selectedChannel ?
                  <ListItem
                    key={channel.id}
                    onClick={() => selectChannel(channel.id)}
                    primaryText={channel.name}
                    rightIcon={<NotificationsIcon color={'#33D0D0'} style={unreadMessagesIcon} />}
                  />
                : <ListItem
                    key={channel.id}
                    onClick={() => selectChannel(channel.id)}
                    primaryText={channel.name}
                  />)
            }
          </List>
        </ScrollArea>
      </div>
    );
  }
}

export default ChannelList;
