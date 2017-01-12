import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import { joinChannel } from '../actions/channels';
import InvitationList from '../components/InvitationList';

export class InvitationsDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <div className="invitations-dialog">
        {this.renderOpenDialogButton()}
        {this.renderDialog()}
      </div>
    );
  }

  renderOpenDialogButton() {
    return (
      <IconButton
        onTouchTap={this.handleOpen}
      >
        <NotificationsIcon
          color='#fff'
          hoverColor="#9E9E9E"
        />
      </IconButton>
    )
  }

  renderDialog() {
    return (
      <Dialog
        title='Invitations'
        modal={false}
        actions={this.renderOkButton()}
        open={this.state.open}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
      >
        <InvitationList
          invitations={this.props.invitations}
          joinChannel={this.props.joinChannel}
          handleClose={() => this.handleClose()}
        />
      </Dialog>
    )
  }

  renderOkButton() {
    return (
      <FlatButton
        label="Ok"
        style={{backgroundColor: '#fff', color: '#000'}}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // Attach inviter to each invitation
    invitations: Object.values(state.reducer.receivedInvitations).sort(compare)
      .map(invitation =>
        Object.assign({}, invitation, {
          inviter: state.reducer.users[invitation.inviterid],
          channel: state.reducer.channels[invitation.channelid]
        }))
  }
};

function compare(a, b) {
  if (a.createdat > b.createdat) {
    return -1;
  }

  if (a.createdat < b.createdat) {
    return 1;
  }

  return 0;
}

const mapDispatchToProps = (dispatch) => {
  return {
    joinChannel: (channel) => {
      dispatch(joinChannel(channel));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitationsDialog);
