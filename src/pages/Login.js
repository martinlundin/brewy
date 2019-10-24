import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MuiPhoneInput from 'material-ui-phone-number';

// Local
import Loader from '../components/Loader';
import { AuthContext } from '../util/auth';
import { StatusContext } from '../util/status';

const useStyles = makeStyles(() => ({
  link: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
}));

function Login({ history }) {
  const classes = useStyles();

  const [number, setNumber] = useState('');
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState('');
  const currentUser = useContext(AuthContext);
  const [status, setStatus] = useContext(StatusContext);

  const submitNumber = (e) => {
    e.preventDefault();
    // Validate
    if (number.length <= 9 || number.length >= 22) {
      setStatus((prev) => ({ ...prev, loading: false, error: 'Enter a valid number' }));
      return;
    }
    sendCodeToNumber();
  };
  const sendCodeToNumber = () => {
    setStatus((prev) => ({ ...prev, loading: true }));
    firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        window.confirmationResult = confirmationResult;

        setSent(true);
        setStatus((prev) => ({ ...prev, loading: false, error: null }));
      }).catch((error) => {
        // Error; SMS not sent
        if (error.code === 'auth/invalid-phone-number') {
          setStatus((prev) => ({ ...prev, loading: false, error: 'Invalid phone number' }));
          return;
        }
        setStatus((prev) => ({ ...prev, loading: false, error: error.message }));
      });
  };

  const verifyCode = (e) => {
    e.preventDefault();
    setStatus((prev) => ({ ...prev, loading: true }));
    window.confirmationResult.confirm(code).then(() => {
      // User signed in successfully. currentUser state will change automatically via AuthContext
      setStatus((prev) => ({ ...prev, loading: false, error: null }));
    }).catch((error) => {
      // User couldn't sign in
      setStatus((prev) => ({ ...prev, loading: false, error: error.message }));
    });
  };

  React.useEffect(() => {
    // Make invisible captcha to prevent spam
    firebase.auth().settings.appVerificationDisabledForTesting = true;
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('submit-number', { size: 'invisible' });
  }, []);

  React.useEffect(() => {
    // If there is a currentUser push him to frontpage
    if (currentUser !== true && currentUser !== false) history.push('/');
  }, [currentUser, history]);

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h1">
        Login
      </Typography>
      {!sent ? (
        <Grid>
          <Typography variant="h5" gutterBottom>
            Enter your phone number
          </Typography>
          <Typography gutterBottom size="small">
            You will then receive a code by SMS.
            In the next step enter the code and you will get logged in.
            No need to remember any password!
          </Typography>
          <form onSubmit={submitNumber}>
            <MuiPhoneInput
              defaultCountry="se"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="number"
              label="Number"
              name="number"
              autoComplete="off"
              autoFocus
              value={number}
              onChange={(e) => setNumber(e)}
            />
            <Button
              id="submit-number"
              type="submit"
              fullWidth
              variant="contained"
            >
              Send Code
              <Loader />
            </Button>
          </form>
        </Grid>
      ) : (
        <Grid>
          <Typography variant="h5" gutterBottom>
            Enter the code
          </Typography>
          <Typography gutterBottom size="small">
            Did not recieve code?
            {' '}
            <Typography className={classes.link} variant="body2" onClick={() => setSent(false)}>
              Enter phone number again
            </Typography>
          </Typography>
          <form onSubmit={verifyCode}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="code"
              label="Code"
              name="code"
              autoFocus
              value={code}
              type="number"
              onChange={(e) => (e.target.value.length <= 6 ? setCode(e.target.value) : null)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Confirm
            </Button>
          </form>
        </Grid>
      )}
    </Container>
  );
}

export default withRouter(Login);
