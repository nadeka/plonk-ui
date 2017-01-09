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
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <Field name="name" type="text" hintText="Name" component={TextField} />
          </div>
          <div>
            <Field name="password" label="Password" type="password" hintText="Password" component={TextField} />
          </div>
          <FlatButton
            label="Register"
            style={{backgroundColor: '#FFFFFF', color: '#000000'}}
            type="submit" />
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
