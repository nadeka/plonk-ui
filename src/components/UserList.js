import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { ListItem, List } from 'material-ui/List';

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      selectedChannel,
      channels,
      users
    } = this.props;

    return(
      <div className="user-list">
        <p className="user-list-title">Members</p>
        <Scrollbars
          renderThumbVertical={({ style, ...props }) =>
            <div {...props} style={{ ...style, backgroundColor: '#fff' }}/>
          }>
          <List>
            {
              Object.values(users)
                .filter(user => channels[selectedChannel].users.find(u => u === user.id))
                .map(user =>
                  <ListItem
                    key={user.id}
                    primaryText={user.name}
                  />
                )
            }
          </List>
        </Scrollbars>
      </div>
    );
  }
}

export default UserList;
