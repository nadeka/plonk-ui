import React from 'react';
import Channel from './Channel';

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLoading, channels, joinChannel } = this.props;

    if (isLoading) {
      return(
        <p>Loading channels..</p>
      );
    }

    return(
      <ul>
        {
          channels.map(channel =>
            <Channel
              key={channel.id}
              {...channel}
              onClick={() => joinChannel(channel.id)}
            />
          )
        }
      </ul>
    );
  }
}

export default ChannelList;
