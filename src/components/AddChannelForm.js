import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { addChannel } from '../actions/channels';
import FlatButton from 'material-ui/FlatButton';
import { Checkbox, TextField } from 'redux-form-material-ui';

class AddChannelForm extends React.Component {
  render() {
    return (
      this.renderForm()
    );
  }

  renderForm() {
    return (
      <form className="add-channel-form" onSubmit={this.props.handleSubmit}>
        {this.renderNameTextField()}
        {this.renderPrivateCheckbox()}
        <div style={{ textAlign: 'left', padding: 25, margin: '24px -24px -24px -24px' }}>
          {this.renderSubmitButton()}
          {this.renderCancelButton()}
        </div>
      </form>
    )
  }

  renderNameTextField() {
    return (
      <Field
        name="name"
        label="Name"
        hintText="Name"
        component={TextField}
      />
    )
  }

  renderPrivateCheckbox() {
    return (
      <Field
        name="private"
        label="Private"
        component={Checkbox}
      />
    )
  }

  renderSubmitButton() {
    return (
      <FlatButton
        label="Create"
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
      dispatch(addChannel(values));
      dispatch(reset('addChannel'));
    },
    handleClose: () => {
      ownProps.handleClose();
    }
  }
};

AddChannelForm = reduxForm({
  form: 'addChannel',
  initialValues: {private: false}
})(AddChannelForm);

AddChannelForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddChannelForm);

export default AddChannelForm;
