import React from 'react';
import { connect } from 'react-redux';
import MessageList from '../components/MessageList';
import { fetchMessages } from '../actions/actions';

export class MessageListContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchMessages(this.props.selectedChannel);
  }

  render() {
    return(
      <MessageList {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.reducer.messages,
    selectedChannel: state.reducer.selectedChannel,
    isLoading: state.reducer.isLoading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: (channel) => {
      dispatch(fetchMessages(channel))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageListContainer);
