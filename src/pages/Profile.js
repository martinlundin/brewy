import React from 'react';
import { withRouter } from 'react-router-dom';

// Mui
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

// Local
import { AuthContext } from '../util/auth';
import { StatusContext } from '../util/status';
import firebase from '../util/firebase';
import Loader from '../components/Loader';

function Profile({ history }) {
  const [currentUser, setCurrentUser] = React.useContext(AuthContext);
  const [status, setStatus] = React.useContext(StatusContext);
  const [displayName, setDisplayName] = React.useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    setStatus((prev) => ({ ...prev, loading: true }));

    // Send profile to firebase
    const userProfile = {
        displayName,
    }
    firebase.firestore().collection('users').doc(currentUser.uid).set(userProfile)
    .then(() => {
      // Profile set, now redirect if user was created, and toast if it was just updated
      setStatus((prev) => ({ ...prev, loading: false, error: null }));
      if(!currentUser.profile){
        setCurrentUser(prev => ({...prev, profile: userProfile}))      
        history.push('/')
      } else {
        setCurrentUser(prev => ({...prev, profile: userProfile}))      
        setStatus((prev) => ({ ...prev, message: "Updated profile" }));
      }
    })
    .catch(error => {
      console.error(error)
      setStatus((prev) => ({ ...prev, loading: false, error: error.message }));
    })
  };

  React.useEffect(() => {
    if (currentUser && currentUser.profile) {
      setDisplayName(currentUser.profile.displayName);
    }
  }, [currentUser]);

  return (
    <Container>
      <Typography variant="h1">Profile</Typography>
      <form onSubmit={submitHandler}>
        <Typography variant="h4">
          {currentUser.phoneNumber}
        </Typography>
        <TextField
          name="displayName"
          label="Display Name"
          margin="normal"
          fullWidth
          autoComplete="off"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          Save
          <Loader />
        </Button>
      </form>
      <Divider />
      <Button
        type="submit"
        margin="normal"
        fullWidth
        variant="outlined"
        onClick={() => firebase.auth().signOut()}
      >
        Logout
      </Button>
    </Container>
  );
}

export default withRouter(Profile);