import React from 'react';
import { ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import { emojify } from 'react-emojione2';

class InvitationListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  };

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <ListItem
        primaryText={
          <div className="invitation">
            <div className="invitation-title">
              <p className="invitation-date"> {moment(this.props.createdat).format('lll')}</p>
              <p>
                <strong>{this.props.inviter.name}</strong> has invited you to channel
                <strong> {this.props.channel.name}</strong>
              </p>
            </div>
            {this.props.message ?
              <div className="invitation-content">
                {emojify(this.props.message)}
              </div>
              :
              null
            }
            <div className="invitation-accept-button">
              <FlatButton
                style={{backgroundColor: '#fff', color: '#000'}}
                label="Accept invitation"
                onClick={() => this.props.joinChannel(this.props.channelid)}>
              </FlatButton>
            </div>
          </div>
        }
      />
    )
  }
}

export default InvitationListItem;
