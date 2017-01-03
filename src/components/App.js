import React from 'react';
import Nes from 'nes/client';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link, IndexLink } from 'react-router';
import ChannelContainer from '../containers/ChannelContainer';
import ChannelListContainer from '../containers/ChannelListContainer';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import cookie from 'react-cookie';
import { authenticateSuccess, openConnection } from '../actions/actions';

const WS_BASE_URL =
  process.env.NODE_ENV !== 'production' ?
    'ws://localhost:6001' :
    'ws://plonk.eu-west-1.elasticbeanstalk.com';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {

  // TODO actually verify the token
  componentDidMount() {
    if (!this.props.userLoggedIn && cookie.load('login_info') && cookie.load('login_info').token) {
      this.props.authenticateSuccess(cookie.load('login_info').userid);
    }
  }

  componentDidUpdate() {
    if (this.props.userLoggedIn && cookie.load('login_info') && cookie.load('login_info').token) {
      let client = new Nes.Client(WS_BASE_URL);

      this.props.openConnection(client);
    }
  }

  render() {
    const { userLoggedIn } = this.props;

    if (userLoggedIn === null) {
      return (
        <MuiThemeProvider>
        <div className="form-container">
          <LoginForm />
          <RegisterForm />
        </div>
        </MuiThemeProvider>
      );
    }

    return (
      <MuiThemeProvider>
        <div className="main-container">
          <ChannelListContainer />
          <ChannelContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.reducer.userLoggedIn
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateSuccess: (id) => {
      dispatch(authenticateSuccess(id))
    },
    openConnection: (client) => {
      dispatch(openConnection(client));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
