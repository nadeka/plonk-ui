import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { addChannel } from '../actions/channels';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const addButtonStyle = {
  color: '#33D033'
};

class AddChannelForm extends React.Component {
  render() {
    return (
      <form className="add-channel-form" onSubmit={this.props.handleSubmit}>
        <Field name="name" component={name =>
          <TextField hintText="Name"
                     type="text"
                     {...name.input}
          />
        }/>
        <FlatButton labelStyle={addButtonStyle} label="Add channel" type="submit" />
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
      dispatch(addChannel(values.name));
      dispatch(reset('addChannel'));
    }
  }
};

AddChannelForm = reduxForm({
  form: 'addChannel'
})(AddChannelForm);

AddChannelForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddChannelForm);

export default AddChannelForm;
