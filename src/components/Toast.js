import React from 'react';

// MUI
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';

// Local
import { StatusContext } from '../util/status';

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
  },
}));

export default function Toast() {
  const classes = useStyles();

  const [status, setStatus] = React.useContext(StatusContext);
  const [variant, setVariant] = React.useState(null);
  const [text, setText] = React.useState(null);

  React.useEffect(() => {
    if (status.error) {
      setVariant('error');
      setText(status.error);
    } else if (status.message) {
      setVariant('info');
      setText(status.message);
      // Autohide after 5 seconds
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, message: null}));
      }, 5000)
    } else {
      setText(null);
    }
  }, [status]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={!!text}
    >
      <SnackbarContent
        className={classes[variant]}
        aria-describedby="client-snackbar"
        message={(
          <span id="client-snackbar" className={classes.message}>
            {variant === 'error'
              ? <ErrorIcon className={classes.icon} />
              : <InfoIcon className={classes.icon} />}
            {text}
          </span>
        )}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => setStatus((prev) => ({ ...prev, error: null, message: null }))}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}
