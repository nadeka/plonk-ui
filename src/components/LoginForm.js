import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { authenticateUser } from '../actions/auth';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';

class LoginForm extends React.Component {

  // TODO show form errors
  render() {
    return (
      <div className="login-form">
        <p className="login-title">Log in</p>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <Field name="name" label="Name" type="text" hintText="Name" component={TextField} />
          </div>
          <div>
            <Field name="password" label="Password" type="password" hintText="Password" component={TextField} />
          </div>
          <FlatButton
            label="Log in"
            type="submit"
            style={{backgroundColor: '#FFFFFF', color: '#000000'}} />
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
