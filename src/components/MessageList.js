import React from 'react';
import AddMessageForm from './AddMessageForm';
import ScrollArea from 'react-scrollbar';
import { ListItem, List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import moment from 'moment';

const subheaderStyle = {
  fontSize: 18
};

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
      <div className="message-list">
        <Subheader style={subheaderStyle}>Messages</Subheader>
        <ScrollArea
          speed={0.8}
          className="message-list-scroll-area"
          contentClassName="message-list-content"
          horizontal={false}
          smoothScrolling={true}
        >
          <List>
            {
              Object.values(messages)
                .filter(message => message.channelid === selectedChannel)
                .map(message =>
                  <ListItem
                    key={message.id}
                    primaryText={users[message.userid].name + ' ' + moment(message.createdat).format('DD.MM. h:mm a')}
                    secondaryText={message.content}
                  />
                )
            }
          </List>
        </ScrollArea>
        <AddMessageForm
          selectedChannel={selectedChannel}
        />
      </div>
    );
  }
}

export default MessageList;
