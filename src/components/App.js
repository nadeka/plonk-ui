import React from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import MessageListContainer from '../containers/MessageListContainer';
import ChannelListContainer from '../containers/ChannelListContainer';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import cookie from 'react-cookie';
import { authenticateSuccess } from '../actions/actions';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {

  componentDidMount() {
    if (!this.props.userLoggedIn && cookie.load('login_info') && cookie.load('login_info').token) {
      this.props.authenticateSuccess(cookie.load('login_info').userid);
    }
  }

  render() {
    const { userLoggedIn } = this.props;

    if (userLoggedIn === null) {
      return (
        <div>
          <LoginForm />
          <br/>
          <RegisterForm />
        </div>
      );
    }

    return (
      <div>
        <ChannelListContainer />
        <MessageListContainer />

        <br/>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.reducer.userLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateSuccess: (id) => {
      dispatch(authenticateSuccess(id))
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
