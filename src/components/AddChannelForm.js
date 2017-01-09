import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { addChannel } from '../actions/channels';
import FlatButton from 'material-ui/FlatButton';
import { Checkbox, TextField } from 'redux-form-material-ui';

class AddChannelForm extends React.Component {
  render() {
    return (
      <form className="add-channel-form" onSubmit={this.props.handleSubmit}>
        <div>
          <Field name="name" label="Name" hintText="Name" component={TextField} />
        </div>
        <br/>
        <div>
          <Field name="private" label="Private" component={Checkbox} />
        </div>
        <br/>
        <div style={{ textAlign: 'left', padding: 8, margin: '24px -24px -24px -24px' }}>
          <FlatButton
            label="Create"
            style={{backgroundColor: '#FFFFFF', color: '#000000'}}
            type="submit"
            keyboardFocused={true}
            onTouchTap={this.props.handleClose}
          />
          <FlatButton
            label="Cancel"
            secondary={true}
            style={{color: '#FFFFFF'}}
            onTouchTap={this.props.handleClose}
          />
        </div>
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
      dispatch(addChannel(values));
      dispatch(reset('addChannel'));
    },
    handleClose: () => {
      ownProps.handleClose();
    }
  }
};

AddChannelForm = reduxForm({
  form: 'addChannel',
  initialValues: {private: false}
})(AddChannelForm);

AddChannelForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddChannelForm);

export default AddChannelForm;
