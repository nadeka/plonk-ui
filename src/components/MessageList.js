import React from 'react';
import AddMessageForm from './AddMessageForm';
import { Scrollbars } from 'react-custom-scrollbars';
import { List } from 'material-ui/List';
import Message from './Message';

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

  renderScrollArea(messages) {
    return (
      <Scrollbars
        ref={(scrollbars) => { this.scrollbars = scrollbars; }}
        renderThumbVertical={({ style, ...props }) =>
          <div {...props} style={{ ...style, backgroundColor: '#fff' }}/>
        }>
        {this.renderScrollAreaContent(messages)}
      </Scrollbars>
    )
  }

  renderScrollAreaContent(messages) {
    return (
      !messages || messages.length < 1 ?
        <p>Start the conversation!</p>
        :
        this.renderMessageList(messages)
    )
  }

  renderMessageList(messages) {
    return (
      <List>
        { messages.map(message => <Message {...message} />) }
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

  render() {
    const {
      selectedChannel,
      messages,
      channels
    } = this.props;

    return(
      <div className="message-list">
        <p className="message-list-title">Messages
          <span className="message-list-channel-name"> {'#' + channels[selectedChannel].name}</span></p>
        {this.renderScrollArea(messages)}
        {this.renderAddMessageForm()}
      </div>
    );
  }
}

export default MessageList;
