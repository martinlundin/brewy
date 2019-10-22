import React, { useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiPhoneInput from 'material-ui-phone-number';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import firebase from 'firebase'

import { withRouter } from 'react-router'

import { AuthContext } from './../util/auth'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  loadingIcon: {
    color: theme.palette.common.white,
    position: 'absolute',
    right: '10px'
  }
}));

function Login({ history }) {
  const classes = useStyles();
  const [number, setNumber] = useState('');
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState('');
  const currentUser = useContext(AuthContext);

  function sendCodeToNumber() {
    firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier)
    .then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      setSent(true)
      window.confirmationResult = confirmationResult;
    }).catch(function (error) {
      // Error; SMS not sent
      console.log(error)
    });
  }

  function verifyCode() {
    window.confirmationResult.confirm(code).then(function (result) {
      // User signed in successfully.
      console.log('Logged in!')
    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      console.log(error)
    });
  }

  React.useEffect(() => {
    // Make invisible captcha to prevent spam
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('submit', { 'size': 'invisible' });
  }, [])

  React.useEffect(() => {
    // If there is a currentUser push him to frontpage
    if(currentUser) history.push("/")
  }, [currentUser, history])
  
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        
        {!sent ?
          <>
          <MuiPhoneInput
          defaultCountry='se'
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
            onChange={e => setNumber(e)}
        />          
          <Button
          id="submit"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={sendCodeToNumber}
          >Send Code</Button>
          </>
        : 
        <>
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
            onChange={e => setCode(e.target.value)}
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
          </>
          }

      </div>
    </Container>
  )
}

export default withRouter (Login)
