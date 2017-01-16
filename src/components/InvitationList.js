import React from 'react';
import { List } from 'material-ui/List';
import InvitationListItem from './InvitationListItem';

class InvitationList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      !this.props.invitations || this.props.invitations.length < 1 ?
        <p>No invitations.</p>
        :
        this.renderInvitationList()
    )
  }

  // TODO clear old items
  renderInvitationList() {
    return (
      <List>
        {
          this.props.invitations.map(invitation =>
          <InvitationListItem
            key={invitation.id}
            joinChannel={this.props.joinChannel}
            deleteReceivedInvitation={this.props.deleteReceivedInvitation}
            {...invitation}
          />)
        }
      </List>
    )
  }
}

export default InvitationList;
