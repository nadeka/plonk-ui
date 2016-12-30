import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { addMessage } from '../actions/actions';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class AddMessageForm extends React.Component {
  render() {
    return (
      <div className="add-message-form">
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <Field name="content" component={content =>
              <TextField hintText="Message"
                         type="text"
                         {...content.input}
              />
            }/>
            <FlatButton label="Send" type="submit" />
          </div>
        </form>
      </div>
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
