import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import { emojify } from 'react-emojione2';
import Paper from 'material-ui/Paper';

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
      <Paper zDepth={0} style={{padding: '2em', margin: '0.5em', background: '#424242'}}>
        <div className="invitation">
          {this.renderTitle()}
          {this.renderMessage()}
          {this.renderActionButtons()}
        </div>
      </Paper>
    )
  }

  renderTitle() {
    return (
      <div className="invitation-title">
        <p className="invitation-date"> {moment(this.props.createdat).format('lll')}</p>
        <p>
          <strong>{this.props.inviter.name}</strong> has invited you to channel
          <strong> {this.props.channel.name}</strong>
        </p>
      </div>
    )
  }

  renderMessage() {
    return (
      this.props.message ?
        <div className="invitation-content">
          {emojify(this.props.message)}
        </div>
        :
        null
    )
  }

  renderActionButtons() {
    return (
      <div className="invitation-action-buttons">
        {this.renderJoinButton()}
        {this.renderDeleteButton()}
      </div>
    )
  }

  renderJoinButton() {
    return (
      <FlatButton
        style={{backgroundColor: '#fff', color: '#000'}}
        label={'Join ' + this.props.channel.name}
        onClick={() => this.props.joinChannel(this.props.channelid)}>
      </FlatButton>
    )
  }

  renderDeleteButton() {
    return (
      <FlatButton
        style={{color: '#fff'}}
        label="Delete invitation"
        onClick={() => this.props.deleteReceivedInvitation(this.props.id)}>
      </FlatButton>
    )
  }
}

export default InvitationListItem;
