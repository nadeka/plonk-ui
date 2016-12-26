import React from 'react';

class Channel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li>
        {this.props.name}
        <button onClick={this.props.onClick}>
          Join
        </button>
      </li>
    );
  }
};

export default Channel;
