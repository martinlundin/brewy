import React from 'react'

// Mui
import { makeStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import Loader from './Loader';

const useStyles = makeStyles(theme => ({
  wrap: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
}))

export default function EditAction() {
  const classes = useStyles();
  
  return (
    <div className={classes.wrap}>
      <Container>
        <Paper>
            <Grid item xs={12}>
                <form autoComplete="off">

                  <FormControl
                    fullWidth
                  >
                      <Button  
                      fullWidth
                      variant="contained" 
                      >
                        Add action
                        <Loader />
                      </Button>
                  </FormControl>

                </form>
            </Grid>
        </Paper>
      </Container>
    </div>
  )
}
