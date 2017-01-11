import React from 'react';
import { ListItem } from 'material-ui/List';

class UserListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListItem
        primaryText={this.props.name}
      />
    )
  }
}

export default UserListItem;
