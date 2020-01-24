import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    borderRadius: '0',
    position: 'fixed',
    bottom: '0',
    left: '0',
  },
}));
export default function BreweryButton() {
  const classes = useStyles();
  return (
    <div>
      <Button
        className={classes.button}
        variant="contained"
        component={Link}
        to="/brewery"
      >
        Go to Brewery
      </Button>
    </div>
  );
}
