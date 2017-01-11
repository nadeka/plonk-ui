import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../actions/auth';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';

class RegisterForm extends React.Component {

  // TODO show form errors
  render() {
    return (
      <div className="register-form">
        <p className="register-title">Register</p>
        {this.renderForm()}
      </div>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        {this.renderNameTextField()}
        {this.renderPasswordField()}
        {this.renderSubmitButton()}
      </form>
    )
  }

  renderNameTextField() {
    return (
      <div>
        <Field name="name" label="Name" type="text" hintText="Name" component={TextField} />
      </div>
    )
  }

  renderPasswordField() {
    return (
      <div>
        <Field name="password" label="Password" type="password" hintText="Password" component={TextField} />
      </div>
    )
  }

  renderSubmitButton() {
    return (
      <FlatButton
        label="Register"
        type="submit"
        style={{backgroundColor: '#fff', color: '#000'}}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (payload) => {
      dispatch(registerUser(payload))
    }
  }
};

RegisterForm = reduxForm({
  form: 'register'
})(RegisterForm);

RegisterForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);

export default RegisterForm;
