import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';

// Local
import { Typography } from '@material-ui/core';
import { AuthContext } from '../util/auth';
import brewy from '../assets/images/brewy.png';

const useStyles = makeStyles(() => ({

  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  siteIdentity: {
    textDecoration: 'none',
    display: 'inline-block',
  },
  siteIcon: {
    maxWidth: '60px',
    verticalAlign: 'middle',
  },
  user: {
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
  },
  userIcon: {
    display: 'block',
    margin: '0 auto',
    fontSize: '45px',
  },
  userText: {
    fontSize: '12px',
    lineHeight: '5px',
  },

}));

export default function Header() {
  const classes = useStyles();
  const [currentUser] = React.useContext(AuthContext);

  return (
    <Container component="header" id="header" className={classes.container}>
      <Link to="/" className={classes.siteIdentity}>
        <img className={classes.siteIcon} src={brewy} alt="Brewy logo" />
      </Link>
      <Grid className={classes.toright}>

        <Link
          className={classes.user}
          to={currentUser ? '/profile' : '/login'}
        >
          <PersonIcon
            color="primary"
            className={classes.userIcon}
          />
          {!currentUser && (
            <Typography
              className={classes.userText}
              color="primary"
            >
              Login
            </Typography>
          )}
        </Link>
      </Grid>
    </Container>
  );
}
