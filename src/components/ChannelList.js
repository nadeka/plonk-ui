import React from 'react';
import AddChannelDialog from './AddChannelDialog';
import { Scrollbars } from 'react-custom-scrollbars';
import { ListItem, List } from 'material-ui/List';
import NotificationsIcon from 'material-ui/svg-icons/av/fiber-manual-record';
import Divider from 'material-ui/Divider';

const unreadMessagesIcon = {
  width: 10,
  height: 10,
  padding: 8
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
        <div className="channel-list-header">
          <p className="channel-list-title">Channels</p>
          <AddChannelDialog />
        </div>
        <Scrollbars
          renderThumbVertical={({ style, ...props }) =>
            <div {...props} style={{ ...style, backgroundColor: '#fff' }}/>
          }>
          <List>
            {Object.values(channels).filter(channel => channel && channel.users && channel.users.find(id => id === userLoggedIn)).length < 1 ?
              null
            :
              <div>
                <p className="channel-list-joined-subheader">Joined channels</p>

                {Object.values(channels)
                  .filter(channel => channel && channel.users &&
                  channel.users.find(id => id === userLoggedIn))
                  .map(channel => channelsWithNewMessages[channel.id]
                    && channel.id !== selectedChannel ?
                    <ListItem
                      key={channel.id}
                      onClick={() => selectChannel(channel.id)}
                      primaryText={'#' + channel.name}
                      style={channel.id === selectedChannel ? {color: '#4FC3F7'} : {color: '#fff'}}
                      rightIcon={<NotificationsIcon color={'#33D0D0'} style={unreadMessagesIcon} />}
                    />
                  : <ListItem
                      key={channel.id}
                      style={channel.id === selectedChannel ? {color: '#4FC3F7'} : {color: '#fff'}}
                      onClick={() => selectChannel(channel.id)}
                      primaryText={'#' + channel.name}
                    />
                  )
                }
                <Divider style={{background: '#fff', margin: '8px'}} />
              </div>
            }
            {
              Object.values(channels)
                .filter(channel => channel && (!channel.users || !channel.users.find(id => id === userLoggedIn)))
                .map(channel =>
                  <ListItem
                    key={channel.id}
                    style={channel.id === selectedChannel ? {color: '#4FC3F7'} : {color: '#fff'}}
                    onClick={() => selectChannel(channel.id)}
                    primaryText={'#' + channel.name}
                  />
                )
            }

          </List>
        </Scrollbars>
      </div>
    );
  }
}

export default ChannelList;
