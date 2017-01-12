import React from 'react';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import InviteUserForm from './InviteUserForm';

export default class InviteUserDialog extends React.Component {
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
      <div className="invite-user-dialog">
        {this.renderOpenDialogButton()}
        {this.renderDialog()}
      </div>
    );
  }

  renderOpenDialogButton() {
    return (
      <FloatingActionButton
        mini={true}
        backgroundColor="#fff"
        iconStyle={{width: '25px', height: '25px'}}
        onTouchTap={this.handleOpen}>
        <ContentAdd
          style={{width: '17px', height: '25px'}}
        />
      </FloatingActionButton>
    )
  }

  renderDialog() {
    return (
      <Dialog
        title='Invite member'
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}>
        <InviteUserForm
          handleClose={() => this.handleClose()}
          channel={this.props.selectedChannel}
        />
      </Dialog>
    )
  }
}
