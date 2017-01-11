import React from 'react';
import Popover from 'material-ui/Popover';
import EmojiPicker from 'emojione-picker';
import Face from 'material-ui/svg-icons/action/face';
import IconButton from 'material-ui/IconButton';

export default class EmojiPopover extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        {this.renderOpenEmojiPickerButton()}
        {this.renderPopover()}
      </div>
    );
  }

  renderOpenEmojiPickerButton() {
    return (
      <IconButton onTouchTap={this.handleTouchTap}>
        <Face color='#fff' hoverColor="#9E9E9E" />
      </IconButton>
    )
  }

  renderPopover() {
    return (
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.handleRequestClose}
      >
        {this.renderEmojiPicker()}
      </Popover>
    )
  }

  renderEmojiPicker() {
    return (
      <EmojiPicker
        search={true}
        emojione={{ imageType: 'png', sprites: true}}
        onChange={this.props.onChange}
      />
    )
  }
}
