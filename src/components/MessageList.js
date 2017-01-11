import React from 'react';
import AddMessageForm from './AddMessageForm';
import { Scrollbars } from 'react-custom-scrollbars';
import { ListItem, List } from 'material-ui/List';
import moment from 'moment';
import { emojify } from 'react-emojione2';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.scrollbars.scrollToBottom();
  }

  componentDidUpdate() {
    // TODO only scroll to bottom when scroll position is already at bottom
    this.scrollbars.scrollToBottom();
  }

  render() {
    const {
      selectedChannel,
      messages,
      channels,
      users
    } = this.props;

    let messagesOfChannel = Object.values(messages)
      .filter(message => message.channelid === selectedChannel);

    return(
      <div className="message-list">
        <p className="message-list-title">Messages
          <span className="message-list-channel-name"> {channels[selectedChannel].name}</span></p>
        <Scrollbars
          ref={(scrollbars) => { this.scrollbars = scrollbars; }}
          hideTracksWhenNotNeeded={true}
          renderThumbVertical={({ style, ...props }) =>
            <div {...props} style={{ ...style, backgroundColor: '#fff' }}/>
              }>
          {!messagesOfChannel || messagesOfChannel.length < 1 ?
            <p>No messages.</p>
            :
            <List>
              {
                messagesOfChannel
                  .map(message =>
                  <ListItem
                    key={message.id}
                    primaryText={
                      <div className="message">
                        <div className="message-title">
                          <p>{users[message.userid].name}
                          <span className="message-date"> {moment(message.createdat).format('DD.MM. h:mm a')}</span>
                          </p>
                        </div>
                        <div className="message-content">
                          {emojify(message.content)}
                        </div>
                      </div>
                    }
                  />
                )
              }
            </List>
          }
        </Scrollbars>
        <AddMessageForm
          selectedChannel={selectedChannel}
        />
      </div>
    );
  }
}

export default MessageList;
