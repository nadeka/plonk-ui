import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { List } from 'material-ui/List';
import UserListItem from './UserListItem';
import InviteUserDialog from './InviteUserDialog';

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="user-list">
        {this.renderUserListHeader()}
        {this.renderScrollArea()}
      </div>
    );
  }

  renderUserListHeader() {
    return (
      <div className="user-list-header">
        <p className="user-list-title">
          Members ({this.props.selectedChannel.users.length})
        </p>
        {this.props.userLoggedIn === this.props.selectedChannel.creatorid ?
          <InviteUserDialog selectedChannel={this.props.selectedChannel} />
          :
          null
        }
      </div>
    )
  }

  renderScrollArea() {
    return (
      <Scrollbars
        renderThumbVertical={({ style, ...props }) =>
          <div {...props} style={{ ...style, backgroundColor: '#fff' }}/>
        }
      >
        {this.renderUserList()}
      </Scrollbars>
    )
  }

  renderUserList() {
    return (
      <List>
        {this.props.users.map(user => <UserListItem key={user.id} {...user} />)}
      </List>
    )
  }
}

export default UserList;
