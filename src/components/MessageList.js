import React from 'react';
import AddMessageForm from './AddMessageForm';
import { Scrollbars } from 'react-custom-scrollbars';
import { List } from 'material-ui/List';
import MessageListItem from './MessageListItem';

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
    return(
      <div className="message-list">
        {this.renderMessageListHeader()}
        {this.renderScrollArea()}
        {this.renderAddMessageForm()}
      </div>
    );
  }

  renderMessageListHeader() {
    return (
      <p className="message-list-title">
        Messages ({this.props.messages.length})
        <span className="message-list-channel-name">
          {'#' + this.props.selectedChannel.name}
          </span>
      </p>
    )
  }

  renderScrollArea() {
    return (
      <Scrollbars
        ref={(scrollbars) => { this.scrollbars = scrollbars; }}
        renderThumbVertical={({ style, ...props }) =>
          <div {...props} style={{ ...style, backgroundColor: '#fff' }}/>
        }>
        {this.renderScrollAreaContent()}
      </Scrollbars>
    )
  }

  renderScrollAreaContent() {
    return (
      !this.props.messages || this.props.messages.length < 1 ?
        <p>Start the conversation!</p>
        :
        this.renderMessageList(this.props.messages)
    )
  }

  renderMessageList() {
    return (
      <List>
        { this.props.messages.map(message => <MessageListItem key={message.id} {...message} />) }
      </List>
    )
  }

  renderAddMessageForm() {
    return (
      <AddMessageForm
        selectedChannel={this.props.selectedChannel}
      />
    )
  }
}

export default MessageList;
