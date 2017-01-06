import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../actions/auth';
import FlatButton from 'material-ui/FlatButton';
import renderTextField from './TextField';

class RegisterForm extends React.Component {

  // TODO show form errors
  render() {
    return (
      <div className="register-form">
        <h1>Register</h1>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <Field name="name" label="Name" type="text" component={renderTextField} />
          </div>
          <div>
            <Field name="password" label="Password" type="password" component={renderTextField} />
          </div>
          <FlatButton label="Register" primary={true} type="submit"></FlatButton>
        </form>
      </div>
    );
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
