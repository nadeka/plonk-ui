import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import LogoutForm from './LogoutForm';

const toolBarStyle = {
  backgroundColor: 'black'
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
          <LogoutForm />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
