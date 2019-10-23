import React from 'react';

// Mui
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Local
import { AuthContext } from '../util/auth';

export default function Profile() {
  const currentUser = React.useContext(AuthContext);
  const [displayName, setDisplayName] = React.useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    // Send profile to firebase
  };

  React.useEffect(() => {
    if (currentUser && currentUser.displayName) {
      setDisplayName(currentUser.displayName);
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
        </Button>
      </form>
    </Container>
  );
}
