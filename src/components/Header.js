import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAction } from '../redux/actions/userActions'

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
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const logoutUser = () => dispatch(logoutUserAction())
  return (
    <header id="header" className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <Grid item xs={6}>
                <Link to="/" className={classes.siteIdentity}><span className={classes.siteIcon} role="img" aria-label="Beer icon">🍻</span> Brewy</Link>
            </Grid>
            <Grid item xs={6} className={classes.toright}>
            {user.authenticated ? 
              <Button variant="contained" size="small" color="secondary" className={classes.margin} onClick={logoutUser}>
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