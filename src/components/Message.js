import React from 'react';
import moment from 'moment';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li>
        <p className="message-header">
          {this.props.sender} {moment(this.props.createdat).format('DD.MM. h:mm a') }
        </p>
        <p className="message-content">{this.props.content}</p>
      </li>
    );
  }
};

export default Message;
