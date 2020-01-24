import React from 'react';
import Axios from 'axios';

// MUI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';

// Local
import BrewContext from '../firebase/brew';
import Loader from './Loader';
import ActionsTree from './ActionsTree';
import BrewTile from './BrewTile';
import EditAction from './EditAction';

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: theme.spacing(2, 0),
  },
  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    textAlign: 'center',
  },
}));

export default function BrewProcesses(props) {
  const classes = useStyles();

  const [brew, dispatch] = React.useContext(BrewContext);
  const [openAction, setOpenAction] = React.useState(false);

  return (
    <Container maxWidth="sm">
      <GridList className={classes.gridList}>
        <BrewTile
          pattern={brew.pattern}
          title={brew.category}
          date={brew.date.getDate()}
          month={brew.date.toLocaleString('default', { month: 'short' }).toLowerCase()}
        />
      </GridList>
      <Grid item xs={12} className={classes.grid}>
        <Loader />

        <ActionsTree setOpenAction={setOpenAction} />

      </Grid>
      <Paper>
        <Typography variant="h5" gutterBottom>
          <InfoOutlinedIcon />
          {' '}
          Every practice was a learning process
        </Typography>
        <Typography>
          When you do something with your brew,
          add a process or a variant process. As the name suggest,
          a variant is a &quot;fork&quot; of your brew.
          This makes it simple to keep track of brewing experiments.
        </Typography>
      </Paper>
    </Container>
  );
}
