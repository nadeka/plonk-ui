import React from 'react';
import Nes from 'nes/client';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChannelContainer from '../containers/ChannelContainer';
import ChannelListContainer from '../containers/ChannelListContainer';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import cookie from 'react-cookie';
import { verifyToken } from '../actions/auth';
import { openConnection, closeConnection } from '../actions/websocket';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {

  componentDidMount() {
    if (!this.props.userLoggedIn) {
      this.props.closeConnection();
      this.props.verifyToken();
    }
  }

  componentDidUpdate() {
    if (this.props.userLoggedIn) {
      this.props.openConnection();
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
    verifyToken: (token) => {
      dispatch(verifyToken(token))
    },
    openConnection: () => {
      dispatch(openConnection());
    },
    closeConnection: () => {
      dispatch(closeConnection());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
