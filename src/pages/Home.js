import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';

// Local
import BreweryButton from '../components/BreweryButton'

const useStyles = makeStyles(() => ({

}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container className={classes.home}>
      <Typography variant="h1">Home</Typography>
      <Typography>lorem ipsum</Typography>
      <Link to="/brewery">Go to brewery</Link>
      <BreweryButton />
    </Container>
  );
}
