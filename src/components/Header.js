import React from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import NotificationsDialog from './InvitationsDialog';
import LogoutForm from './LogoutForm';

const toolBarStyle = {
  backgroundColor: '#000'
};

export default class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Toolbar style={toolBarStyle}>
        <ToolbarGroup firstChild={true}>
      </ToolbarGroup>
        <ToolbarGroup>
          <NotificationsDialog />
          <div>
            <p className="toolbar-user-logged-in-name">{this.props.name}</p>
          </div>
          <LogoutForm />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
