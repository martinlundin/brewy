import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import firebase from './../util/firebase';
import { AuthContext } from './../util/auth';

const useStyles = makeStyles(theme => ({

  root: {
    flexGrow: 1,
  },
  toright: {
    textAlign: "right",
  },
  siteIdentity: {
    color: theme.palette.common.white,
    textDecoration: "none",
    fontSize: "20px",
    display: 'inline-block',
  },
  siteIcon: {
    fontSize: "40px",
    verticalAlign: "middle",
  },

}));

export default function Header() {
  const classes = useStyles();
  const currentUser = React.useContext(AuthContext);
console.log(currentUser)
  return (
    <header id="header" className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <Grid item xs={6}>
                <Link to="/" className={classes.siteIdentity}><span className={classes.siteIcon} role="img" aria-label="Beer icon">🍻</span> Brewy</Link>
            </Grid>
            <Grid item xs={6} className={classes.toright}>
            {currentUser ? 
              <Button variant="contained" size="small" color="secondary" className={classes.margin} onClick={() => firebase.auth().signOut()}>
                Logout
              </Button>
            :
              <Button variant="contained" size="small" color="secondary" className={classes.margin} component={Link} to="/login">
                Login
              </Button>
            }
            </Grid>
        </Toolbar>
      </AppBar>
    </header>
  );
}