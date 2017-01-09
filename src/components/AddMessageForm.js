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
      <form className="add-message-form" onSubmit={this.props.handleSubmit}>
        <EmojiPopover onChange={(data) =>
          this.refs.content.getRenderedComponent().props.input.onChange((this.refs.content.value || '') + data.shortname)} />
        <Field name="content" label="Message" hintText="Message" ref='content' withRef={true} component={TextField} />
        <FlatButton style={{backgroundColor: '#FFFFFF', color: '#000000'}} label="Send" type="submit" />
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (values) => {
      dispatch(addMessage(values.content, ownProps.selectedChannel));
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
