import React from 'react';
import PropTypes from 'prop-types';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import PasswordIcon from 'material-ui/svg-icons/action/lock';
import Paper from 'material-ui/Paper';
import { translate } from 'react-i18next';
import Form from '../../../components/Form';
import FormGroup from '../../../components/Form/Group';
import TextField from '../../../components/Form/TextField';
import Button from '../../../components/Form/Button';

const enhance = translate();

class PasswordResetPage extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  state = {
    newPassword: '',
    newPasswordConfirm: ''
  };

  isValid() {
    return this.state.newPassword.length >= 6 &&
      this.state.newPassword === this.state.newPasswordConfirm;
  }

  handlePasswordChange = (event) => {
    this.setState({
      newPassword: event.target.value
    });
  };

  handlePasswordConfirmChange = (event) => {
    this.setState({
      newPasswordConfirm: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.isValid()) {
      this.props.onSubmit(this.state.newPassword);
    }
  };

  render() {
    const { t, email } = this.props;
    const isValid = this.isValid();

    return (
      <Paper className="PasswordReset">
        <p>
          {t('resetPassword.introduction')}
        </p>
        <Form onSubmit={this.handleSubmit}>
          {email && (
            // Not used at the moment, but we may show (parts of) the user's
            // email address on the reset page at some point.
            <FormGroup>
              <TextField
                type="email"
                disabled
                value={email}
                placeholder={t('login.email')}
                icon={<EmailIcon color="#9f9d9e" />}
              />
            </FormGroup>
          )}
          <FormGroup>
            <TextField
              type="password"
              value={this.state.newPassword}
              onChange={this.handlePasswordChange}
              placeholder={t('login.password')}
              icon={<PasswordIcon color="#9f9d9e" />}
            />
          </FormGroup>
          <FormGroup>
            <TextField
              type="password"
              value={this.state.newPasswordConfirm}
              onChange={this.handlePasswordConfirmChange}
              placeholder={t('login.password')}
              icon={<PasswordIcon color="#9f9d9e" />}
            />
          </FormGroup>
          <FormGroup>
            <Button disabled={!isValid}>
              {t('resetPassword.submit')}
            </Button>
          </FormGroup>
        </Form>
      </Paper>
    );
  }
}

export default enhance(PasswordResetPage);
