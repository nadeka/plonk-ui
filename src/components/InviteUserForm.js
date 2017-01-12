import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { inviteUser } from '../actions/channels';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';

class InviteUserForm extends React.Component {
  render() {
    return (
      this.renderForm()
    );
  }

  renderForm() {
    return (
      <form className="invite-user-form" onSubmit={this.props.handleSubmit}>
        {this.renderNameTextField()}
        {this.renderMessageTextField()}
        <div style={{ textAlign: 'left', padding: 8, margin: '24px -24px -24px -24px' }}>
          {this.renderSubmitButton()}
          {this.renderCancelButton()}
        </div>
      </form>
    )
  }

  renderNameTextField() {
    return (
      <div>
        <Field
          name="inviteename"
          label="Name"
          hintText="Name"
          component={TextField}
        />
      </div>
    )
  }

  renderMessageTextField() {
    return (
      <div>
        <Field
          name="message"
          label="Message"
          hintText="Message"
          component={TextField}
        />
      </div>
    )
  }

  renderSubmitButton() {
    return (
      <FlatButton
        label="Invite"
        style={{backgroundColor: '#fff', color: '#000'}}
        type="submit"
        keyboardFocused={true}
        onTouchTap={this.props.handleClose}
      />
    )
  }

  renderCancelButton() {
    return (
      <FlatButton
        label="Cancel"
        secondary={true}
        style={{color: '#fff'}}
        onTouchTap={this.props.handleClose}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (values) => {
      dispatch(inviteUser(values, ownProps.channel.id));
      dispatch(reset('inviteUser'));
    },
    handleClose: () => {
      ownProps.handleClose();
    }
  }
};

InviteUserForm = reduxForm({
  form: 'inviteUser'
})(InviteUserForm);

InviteUserForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteUserForm);

export default InviteUserForm;
