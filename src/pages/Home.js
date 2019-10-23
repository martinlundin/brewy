import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';

// Local
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.home}>
      <Typography variant="h1">Home</Typography>
      <Typography>lorem ipsum</Typography>
    </div>
  );
}
