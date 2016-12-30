import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { addChannel } from '../actions/actions';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class AddChannelForm extends React.Component {
  render() {
    return (
      <div className="add-channel-form">
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <Field name="name" component={name =>
              <TextField hintText="Name"
                         type="text"
                         {...name.input}
              />
            }/>
            <FlatButton label="Add channel" type="submit" />
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
