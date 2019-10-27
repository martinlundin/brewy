import React from 'react';
import { withRouter } from 'react-router-dom';
import FileUploader from "react-firebase-file-uploader";

// Mui
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// Local
import { AuthContext } from '../util/auth';
import { StatusContext } from '../util/status';
import firebase from '../util/firebase';
import Loader from '../components/Loader';
import generatePattern from '../util/pattern'

const useStyles = makeStyles((theme) => ({
  avatarWrap: {
    display: 'flex',
    width: '100px',
    height: '100px',
    margin: '0 auto',
    alignItems: 'flex-end',
    background: 'transparent',
  },
  avatar: {
    display: 'flex',
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.2)',
  },
  avatarText: {
    width: '100%',
    background: 'rgba(0,0,0,0.2)',
    color: theme.palette.text.primary,
    position: 'absolute',
  }
}));

function Profile({ history }) {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = React.useContext(AuthContext);
  const [status, setStatus] = React.useContext(StatusContext);
  const [displayName, setDisplayName] = React.useState('');
  const [avatar, setAvatar] = React.useState('');

  React.useEffect(() => {
    if (currentUser && currentUser.profile) {
      setDisplayName(currentUser.profile.displayName);
      setAvatar(currentUser.profile.avatar);
    } else{
      setAvatar(generatePattern());
    }
  }, [currentUser]);

  const handleProgress = progress => console.log(progress)
  const handleUploadError = error => {
    console.error(error);
  };
  const handleUploadSuccess = filename => {
    console.log('success upload')
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {setAvatar(url); console.log('successurl', url)});
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setStatus((prev) => ({ ...prev, loading: true }));

    // Send profile to firebase
    const userProfile = {
        displayName,
        avatar,
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

  return (
    <Container>
      <Typography variant="h1">Profile</Typography>
      <form onSubmit={submitHandler}>
        <label>
          <Avatar className={classes.avatarWrap}>
            <Avatar className={classes.avatar} src={avatar} alt="avatar">
            </Avatar>
            <Typography className={classes.avatarText}>Upload</Typography>
          </Avatar>
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            hidden
            storageRef={firebase.storage().ref("images")}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          />
        </label>
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