import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import Loader from '../../Loader';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

const enhance = translate();

class ResetPasswordForm extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    error: PropTypes.object,
    onResetPassword: PropTypes.func.isRequired,
    onCloseDialog: PropTypes.func.isRequired
  };

  state = {
    busy: false,
    done: false
  };

  componentWillReceiveProps() {
    this.setState({ busy: false });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ busy: true });
    Promise.resolve(this.props.onResetPassword({
      email: this.email.value
    })).then(() => {
      this.setState({
        busy: false,
        done: true
      });
    });
  };

  refEmail = (email) => {
    this.email = email;
  };

  render() {
    const { t, error, onCloseDialog } = this.props;
    const { busy, done } = this.state;

    if (done) {
      return (
        <div>
          <p>{t('login.passwordResetSent')}</p>
          <p>
            <Button className="ResetPasswordForm-submit" onClick={onCloseDialog}>
              {t('close')}
            </Button>
          </p>
        </div>
      );
    }

    return (
      <Form className="ResetPasswordForm" onSubmit={this.handleSubmit}>
        {error && <FormGroup>{error.message}</FormGroup>}
        <FormGroup>
          <TextField
            ref={this.refEmail}
            className="ResetPasswordForm-field"
            type="email"
            placeholder="E-Mail"
            icon={<EmailIcon color="#9f9d9e" />}
          />
        </FormGroup>

        <FormGroup>
          <Button
            className="ResetPasswordForm-submit"
            disabled={busy}
          >
            {busy ? (
              <div className="Button-loading"><Loader size="tiny" /></div>
            ) : t('login.requestPasswordReset')}
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default enhance(ResetPasswordForm);
