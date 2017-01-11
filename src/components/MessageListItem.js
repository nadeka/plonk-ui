import React from 'react';
import { ListItem } from 'material-ui/List';
import moment from 'moment';
import { emojify } from 'react-emojione2';

class MessageListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListItem
        primaryText={
          <div className="message">
            <div className="message-title">
              <p>{this.props.sender}
                <span className="message-date"> {moment(this.props.createdat).format('DD.MM. h:mm a')}</span>
              </p>
            </div>
            <div className="message-content">
              {emojify(this.props.content)}
            </div>
          </div>
        }
      />
    )
  }
}

export default MessageListItem;
