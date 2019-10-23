import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
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

export default function Toast(props) {
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
      setText(status.info);
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
