import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { addMessage } from '../actions/channels';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';

class AddMessageForm extends React.Component {
  render() {
    return (
      <form className="add-message-form" onSubmit={this.props.handleSubmit}>
        <Field name="content" label="Message" hintText="Message" component={TextField} />
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
