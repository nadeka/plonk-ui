import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { authenticateUser } from '../actions/auth';
import FlatButton from 'material-ui/FlatButton';
import renderTextField from './TextField';

class LoginForm extends React.Component {

  // TODO show form errors
  render() {
    return (
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <Field name="name" label="Name" component={renderTextField} />
          </div>
          <div>
            <Field name="password" label="Password" component={renderTextField} />
          </div>
          <FlatButton label="Log in" type="submit" primary={true} />
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
