import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { logOut } from '../actions/auth';
import FlatButton from 'material-ui/FlatButton';

class LogoutForm extends React.Component {

  render() {
    return (
      <div className="logout-form">
        <form onSubmit={this.props.handleSubmit}>
          <FlatButton label="Log out" type="submit" style={{backgroundColor: '#FFFFFF', color: '#000000'}} />
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
    onSubmit: () => {
      dispatch(logOut())
    }
  }
};

LogoutForm = reduxForm({
  form: 'logout'
})(LogoutForm);

LogoutForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutForm);

export default LogoutForm;
