import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';

// Local
import { Typography } from '@material-ui/core';
import { AuthContext } from '../util/auth';

const useStyles = makeStyles((theme) => ({

  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  siteIdentity: {
    textDecoration: 'none',
    display: 'inline-block',
  },
  siteIcon: {
    fontSize: '40px',
    verticalAlign: 'middle',
  },
  user: {
    display: 'inline-block',
    textDecoration: 'none',
  },
  userIcon: {
    display: 'block',
    margin: '0 auto',
    fontSize: '30px',
  },
  userText: {
    fontSize: '12px',
    lineHeight: '5px',
  },

}));

export default function Header() {
  const classes = useStyles();

  const currentUser = React.useContext(AuthContext);

  return (
    <header id="header">
      <Container className={classes.container}>
        <Link to="/" className={classes.siteIdentity}>
          <span className={classes.siteIcon} role="img" aria-label="Beer icon">🍻</span>
        </Link>
        <Grid className={classes.toright}>
          {currentUser
            ? (
              <Button
                variant="contained"
                size="small"
                color="primary"
                className={classes.user}
                component={Link}
                to="/profile"
              >
                <PersonIcon />
              </Button>
            )
            : (
              <Link
                className={classes.user}
                to="/login"
              >
                <PersonIcon
                  color="primary"
                  className={classes.userIcon}
                />
                <Typography
                  className={classes.userText}
                  color="primary"
                >
                  Login
                </Typography>
              </Link>
            )}
        </Grid>
      </Container>
    </header>
  );
}
