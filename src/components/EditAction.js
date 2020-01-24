import React from 'react';

// Mui
import { makeStyles, TextField } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

import Loader from './Loader';
import TextSuggest from './TextSuggest';
import ActionContext from '../firebase/action';
import BrewContext from '../firebase/brew';

const useStyles = makeStyles((theme) => ({
  wrap: {
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

export default function EditAction(props) {
  const classes = useStyles();

  const brew = React.useContext(BrewContext);
  const [actionContext, setActionContext] = React.useContext(ActionContext);
  const [action, setAction] = React.useState(actionContext);

  const typeSuggestion = [
    { label: 'Fermentation' },
    { label: 'Cooling' },
    { label: 'Flavouring' },
  ];

  const handleType = (type) => (event, { newValue }) => {
    setAction((prev) => ({
      ...prev,
      type: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActionContext(action);
    props.setOpenAction(false);
  };

  React.useEffect(() => {
    setAction(actionContext);
  }, [actionContext]);

  React.useEffect(() => {
    if (brew.brewId) {
      setAction((prev) => ({ ...prev, brewId: brew.brewId }));
    }
  }, [brew]);

  React.useEffect(() => () => {
    setAction({});
  }, []);

  return (
    <div className={classes.wrap}>
      <Paper>
        <Grid item xs={12}>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <FormControl margin="normal" fullWidth>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  autoOk
                  ampm={false}
                  value={action.startedAt}
                  onChange={(startedAt) => setAction((prev) => ({
                    ...prev,
                    startedAt,
                  }))}
                  label="Started at"
                  views={['date', 'hours']}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextSuggest handleChange={handleType} value={action.type} suggestions={typeSuggestion} label="Type" />
            </FormControl>
            <Loader />
            <FormControl margin="normal" fullWidth>
              <Button
                fullWidth
                variant="contained"
                type="submit"
              >
                      Add action
              </Button>
            </FormControl>

          </form>
        </Grid>
      </Paper>
    </div>
  );
}
