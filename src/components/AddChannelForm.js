import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { addChannel } from '../actions/channels';
import FlatButton from 'material-ui/FlatButton';
import renderTextField from './TextField';

const addButtonStyle = {
  color: '#33D033'
};

class AddChannelForm extends React.Component {
  render() {
    return (
      <form className="add-channel-form" onSubmit={this.props.handleSubmit}>
        <div>
          <Field name="name" label="Name" component={renderTextField} />
        </div>
        <br/>
        <div>
          <label htmlFor="private">Private</label>
          <Field name="private" id="private" component="input" type="checkbox"/>
        </div>
        <br/>
        <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.props.handleClose}
          />
          <FlatButton
            label="Create"
            primary={true}
            type="submit"
            keyboardFocused={true}
            onTouchTap={this.props.handleClose}
            style={addButtonStyle}
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
