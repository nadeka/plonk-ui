import React from 'react';
import ScrollArea from 'react-scrollbar';
import Subheader from 'material-ui/Subheader';
import { ListItem, List } from 'material-ui/List';

const subheaderStyle = {
  fontSize: 18
};

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
        <Subheader style={subheaderStyle}>Members</Subheader>
        <ScrollArea
          speed={0.8}
          className="user-list-scroll-area"
          contentClassName="user-list-content"
          horizontal={false}
          smoothScrolling={true}
        >
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
        </ScrollArea>
      </div>
    );
  }
}

export default UserList;
