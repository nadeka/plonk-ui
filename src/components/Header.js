import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
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
        <ToolbarTitle text="PLONK"></ToolbarTitle>
        <ToolbarGroup>
          <LogoutForm />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
