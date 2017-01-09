import React from 'react';
import AddMessageForm from './AddMessageForm';
import ScrollArea from 'react-scrollbar';
import { ListItem, List } from 'material-ui/List';
import moment from 'moment';
import { emojify } from 'react-emojione2';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
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
        <ScrollArea
          speed={0.8}
          className="message-list-scroll-area"
          contentClassName="message-list-content"
          horizontal={false}
          smoothScrolling={true}
          verticalScrollbarStyle={{background: 'white'}}
        >
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
        </ScrollArea>
        <AddMessageForm
          selectedChannel={selectedChannel}
        />
      </div>
    );
  }
}

export default MessageList;
