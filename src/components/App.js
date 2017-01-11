import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChannelContainer from '../containers/ChannelContainer';
import ChannelListContainer from '../containers/ChannelListContainer';
import Header from './Header';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { verifyToken } from '../actions/auth';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  componentDidMount() {
    if (!this.props.userLoggedIn) {
      this.props.verifyToken();
    }
  }

  componentDidUpdate() {
    if (!this.props.userLoggedIn) {
      this.props.verifyToken();
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        {this.props.userLoggedIn ?
          <div>
            <div className="header">
              <Header />
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
    verifyToken: () => {
      dispatch(verifyToken())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
