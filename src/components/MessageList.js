import React from 'react';
import Message from './Message';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLoading, selectedChannel, messages } = this.props;

    if (isLoading) {
      return(
        <p>Loading messages..</p>
      );
    }

    return(
      <ul>
        {
          messages
            .filter(message => message.channelid === selectedChannel)
            .map(message =>
            <Message
              key={message.id}
              {...message}
            />
          )
        }
      </ul>
    );
  }
}

export default MessageList;
