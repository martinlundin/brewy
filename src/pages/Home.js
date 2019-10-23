import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// Local
import { AuthProvider } from '../util/auth';


const useStyles = makeStyles((theme) => ({
  home: {
    textAlign: 'center',
  },
  fab: {
    position: 'fixed',
    bottom: '15px',
    left: '50%',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  addIcon: {
    marginRight: '5px',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.home}>
      <h1>Home</h1>
      <AuthProvider />
      <Link to="/brewery">
        <Fab
          variant="extended"
          aria-label="Create new brew"
          className={classes.fab}
        >
          <AddIcon className={classes.addIcon} />
          Start new brew
        </Fab>
      </Link>
    </div>
  );
}
