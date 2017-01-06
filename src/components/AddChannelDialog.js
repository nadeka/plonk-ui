import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import AddChannelForm from './AddChannelForm';

export default class AddChannelDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <RaisedButton label='Add channel' onTouchTap={this.handleOpen} />
        <Dialog
          title='Add new channel'
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <AddChannelForm handleClose={() => this.handleClose()} />
        </Dialog>
      </div>
    );
  }
}
