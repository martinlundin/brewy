import React from 'react';
import { withRouter } from 'react-router-dom';

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
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

// Local
import generatePattern from '../util/pattern';
import BrewContext from '../firebase/brew';
import BrewTile from './BrewTile';
import Loader from './Loader';

const useStyles = makeStyles(() => ({
  gridList: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  patternButton: {
    display: 'flex',
    margin: '5px auto',
    height: 'auto!important',
    width: 'auto!important',
    padding: '2px 5px!important',
    fontSize: '12px',
  },
  stepping: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  steppingButton: {
    marginLeft: 'auto',
  },
}));

function StartBrew({ history }) {
  const classes = useStyles();

  const { brew: brewContext, addBrew } = React.useContext(BrewContext);
  const [brew, setBrew] = React.useState(brewContext);

  // Fixed select label styling
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  React.useEffect(() => {
    // If brewContext has brewId, move on to it
    if (brewContext.brewId) {
      history.push(`/brewery/${brewContext.brewId}`);
    }
  }, [brewContext]);

  return (
    <Container className={classes.container} maxWidth="sm">
      <GridList className={classes.gridList}>
        <BrewTile pattern={brew.pattern} title={brew.category} date={brew.date.getDate()} month={brew.date.toLocaleString('default', { month: 'short' }).toLowerCase()} />
        <Button
          variant="outlined"
          className={classes.patternButton}
          onClick={() => setBrew((prev) => ({
            ...prev,
            pattern: generatePattern(),
          }))}
        >
                    Generate pattern
        </Button>
      </GridList>
      <Paper>
        <Grid item xs={12}>
          <form
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              addBrew(brew);
            }}
          >

            <FormControl margin="normal" fullWidth>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  autoOk
                  ampm={false}
                  value={brew.date}
                  onChange={(date) => setBrew((prev) => ({
                    ...prev,
                    date,
                  }))}
                  label="Date"
                  views={['date', 'hours']}
                />
              </MuiPickersUtilsProvider>
            </FormControl>

            <FormControl variant="outlined" margin="normal" fullWidth>
              <InputLabel ref={inputLabel} htmlFor="category">Category</InputLabel>
              <Select
                value={brew.category}
                onChange={(e) => setBrew((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))}
                labelWidth={labelWidth}
                inputProps={{
                  name: 'category',
                  id: 'category',
                }}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Beer">Beer</MenuItem>
                <MenuItem value="Cider">Cider</MenuItem>
                <MenuItem value="Kefir">Kefir</MenuItem>
                <MenuItem value="Kombucha">Kombucha</MenuItem>
                <MenuItem value="Mead">Mead</MenuItem>
                <MenuItem value="Wine">Wine</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.stepping}>
              <Button
                className={classes.steppingButton}
                variant="contained"
                type="submit"
              >
                Start
                <Loader />
              </Button>
            </FormControl>

          </form>
        </Grid>
      </Paper>
      <Paper>
        <Typography variant="h5" gutterBottom>
          <InfoOutlinedIcon />
          {' '}
        Every masterpiece start somewhere
        </Typography>
        <Typography>
            And this is where you start yours.
            Give the brew a date and a category.
            The pattern is as a placeholder,
            you will be able to add an image and name the brew when it is completed.
        </Typography>
      </Paper>
    </Container>
  );
}

export default withRouter(StartBrew);
