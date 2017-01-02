import React from 'react';
import Channel from './Channel';
import AddChannelForm from './AddChannelForm';

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLoading, channels, selectChannel } = this.props;

    if (isLoading || !channels) {
      return (
        <div>Loading channels..</div>
      );
    }

    console.log(channels);

    return(
      <div className="channel-list">
        <ul>
          {
            Object.values(channels).map(channel =>
              <Channel
                key={channel.id}
                onClick={() => selectChannel(channel.id)}
                {...channel}
              />
            )
          }
        </ul>
        <AddChannelForm />
      </div>
    );
  }
}

export default ChannelList;
