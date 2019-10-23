import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MuiPhoneInput from 'material-ui-phone-number';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// Local
import { AuthContext } from '../util/auth';

function Login({ history }) {
  const [number, setNumber] = useState('');
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState('');
  const currentUser = useContext(AuthContext);

  const sendCodeToNumber = () => {
    firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        setSent(true);
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  };

  const verifyCode = () => {
    window.confirmationResult.confirm(code).then(() => {
      // User signed in successfully.
      console.log('Logged in!');
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      console.log(error);
    });
  };

  React.useEffect(() => {
    // Make invisible captcha to prevent spam
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('submit', { size: 'invisible' });
  }, []);

  React.useEffect(() => {
    // If there is a currentUser push him to frontpage
    if (currentUser) history.push('/');
  }, [currentUser, history]);

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h1">
        Login
      </Typography>
      {!sent ? (
        <Grid>
          <Typography variant="h5" gutterBottom>
            Enter your phonenumber
          </Typography>
          <Typography gutterBottom size="small">
            You will then recieve a code by SMS.
            In the next step enter the code and you are logged in.
            No need to remember any password!
          </Typography>
          <MuiPhoneInput
            defaultCountry="se"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="number"
            label="Number"
            name="number"
            autoComplete="number"
            autoFocus
            value={number}
            onChange={(e) => setNumber(e)}
          />
          <Button
            id="submit"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={sendCodeToNumber}
          >
            Send Code
          </Button>
        </Grid>
      ) : (
        <Grid>
          <ArrowBackIosIcon fontSize="small" />
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
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={verifyCode}
          >
            Confirm
          </Button>
        </Grid>
      )}
    </Container>
  );
}

export default withRouter(Login);
