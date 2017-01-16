import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
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
          <ToolbarTitle text='Plonk' />
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
