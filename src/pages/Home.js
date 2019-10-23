import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// Local
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(() => ({

}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container className={classes.home}>
      <Typography variant="h1">Home</Typography>
      <Typography>lorem ipsum</Typography>
      <Link to="/login">Link</Link>
    </Container>
  );
}
