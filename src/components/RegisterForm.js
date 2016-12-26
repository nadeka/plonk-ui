import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../actions/actions';

class RegisterForm extends React.Component {
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field name="password" component="input" type="password"/>
          </div>
          <button type="submit">Submit</button>
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
