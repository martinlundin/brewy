import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import StatusContext from '../util/status';

const useStyles = makeStyles(() => ({
  loader: {
    width: '1rem!important',
    height: '1rem!important',
    margin: '0 0.5rem',
  },
}));

export default function Loader(props) {
  const [status, setStatus] = React.useContext(StatusContext);
  const classes = useStyles();

  return (
    <>
      {status && status.loading
        ? <CircularProgress color="inherit" className={classes.loader} {...props} />
        : null}
    </>
  );
}
