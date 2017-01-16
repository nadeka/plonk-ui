import React from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChannelContainer from '../containers/ChannelContainer';
import ChannelListContainer from '../containers/ChannelListContainer';
import Header from './Header';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { verifyToken } from '../actions/auth';
import { closeSnackbar } from '../actions/notifications';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Snackbar from 'material-ui/Snackbar';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  componentDidMount() {
    if (!this.props.userLoggedIn && cookie.load('accessToken')) {
      this.props.verifyToken();
    }
  }

  componentDidUpdate() {
    if (!this.props.userLoggedIn && cookie.load('accessToken')) {
      this.props.verifyToken();
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          {this.props.userLoggedIn ?
            <div>
              <div className="header">
                <Header {...this.props.userLoggedIn} />
              </div>
              <div className="main-container">
                <ChannelListContainer />
                <ChannelContainer />
              </div>
            </div>
            :
            <div className="form-container">
              <LoginForm />
              <RegisterForm />
            </div>
          }
          <Snackbar
            open={this.props.snackbar.open}
            message={this.props.snackbar.message}
            autoHideDuration={2000}
            bodyStyle={this.props.snackbar.type === 'error' ? {background: '#E53935'} : {background: '#4CAF50'}}
            contentStyle={{color: '#fff', fontWeight: 'bold'}}
            onRequestClose={this.props.closeSnackbar}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.reducer.userLoggedIn ? state.reducer.users[state.reducer.userLoggedIn] : null,
    snackbar: state.reducer.snackbar
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyToken: () => {
      dispatch(verifyToken());
    },
    closeSnackbar: () => {
      dispatch(closeSnackbar());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
