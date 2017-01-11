import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { addMessage } from '../actions/channels';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';
import EmojiPopover from './EmojiPopover';

class AddMessageForm extends React.Component {
  render() {
    return (
      this.renderForm()
    );
  }

  renderForm() {
    return (
      <form
        className="add-message-form"
        onSubmit={this.props.handleSubmit}>

          {this.renderEmojiPicker()}
          {this.renderContentTextField()}
          {this.renderSubmitButton()}
      </form>
    )
  }

  renderEmojiPicker() {
    return (
      <EmojiPopover
        onChange={(emoji) => this.addEmojiToInput(emoji)}
      />
    )
  }

  addEmojiToInput(emoji) {
    this.refs.content.getRenderedComponent()
      .props.input.onChange((this.refs.content.value || '') + emoji.shortname)
  }

  renderContentTextField() {
    return (
      <Field
        name="content"
        label="Message"
        hintText="Message"
        ref='content'
        withRef={true}
        component={TextField}
      />
    )
  }

  renderSubmitButton() {
    return (
      <FlatButton
        style={{backgroundColor: '#fff', color: '#000'}}
        label="Send"
        type="submit"
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (values) => {
      dispatch(addMessage(values.content, ownProps.selectedChannel.id));
      dispatch(reset('addMessage'));
    }
  }
};

AddMessageForm = reduxForm({
  form: 'addMessage'
})(AddMessageForm);

AddMessageForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMessageForm);

export default AddMessageForm;
