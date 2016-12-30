import React from 'react';
import Message from './Message';
import AddMessageForm from './AddMessageForm';
import ScrollArea from 'react-scrollbar';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      selectedChannel,
      messages,
      users
    } = this.props;

    return(
      <div>
        <div className="message-list">
          <ScrollArea
            speed={0.8}
            className="message-list-scroll-area"
            contentClassName="message-list-content"
            horizontal={false}
            smoothScrolling={true}
          >
            <ul>
              {
                Object.values(messages)
                  .filter(message => message.channelid === selectedChannel)
                  .map(message =>
                    <Message
                      key={message.id}
                      sender={users[messages[message.id].userid].name}
                      {...message}
                    />
                  )
              }
            </ul>
          </ScrollArea>
        </div>
        <AddMessageForm
          selectedChannel={selectedChannel}
        />
      </div>
    );
  }
}

export default MessageList;
