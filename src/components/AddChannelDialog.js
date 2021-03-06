import React from 'react';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddChannelForm from './AddChannelForm';

export default class AddChannelDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

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
      <div className="add-channel-dialog">
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
        title='Create new channel'
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}>
        <AddChannelForm
          handleClose={() => this.handleClose()}
        />
      </Dialog>
    )
  }
}
