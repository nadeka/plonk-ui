import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { authenticateUser } from '../actions/actions';

class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
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
      dispatch(authenticateUser(payload))
    }
  }
};

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default LoginForm;
