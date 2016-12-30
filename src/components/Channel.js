import React from 'react';
import FlatButton from 'material-ui/FlatButton';

class Channel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO notify of unread messages

    return (
      <li>
          <FlatButton label={this.props.name} onClick={this.props.onClick} />
      </li>
    );
  }
};

export default Channel;
