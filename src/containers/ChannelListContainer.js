import React from 'react';
import { connect } from 'react-redux';
import ChannelList from '../components/ChannelList';
import { fetchChannels, selectChannel } from '../actions/actions';

export class ChannelListContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchChannels();
  }

  render() {
    return(
      <ChannelList {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channels: state.reducer.channels
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChannels: () => {
      dispatch(fetchChannels());
    },
    selectChannel: (channel) => {
      dispatch(selectChannel(channel));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelListContainer);
