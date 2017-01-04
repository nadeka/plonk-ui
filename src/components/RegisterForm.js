import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../actions/auth';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class RegisterForm extends React.Component {

  // TODO show form errors
  render() {
    return (
      <div className="register-form">
        <h1>Register</h1>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <Field name="name" component={name =>
              <TextField hintText = "Name"
                         floatingLabelText="Name"
                         type="text"
                         {...name.input}
              />
            }/>
          </div>
          <div>
            <Field name="password" component={password =>
              <TextField hintText="Password"
                         floatingLabelText="Password"
                         type="password"
                         {...password.input}
              />
            }/>
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
