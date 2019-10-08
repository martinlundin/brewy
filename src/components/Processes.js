import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers';
import AddIngredients from './AddIngredients'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '70%',
    flexShrink: 0,
  },
  formControl: {
      width: "50%",
  },
  expansionDetails: {
    flexFlow: 'wrap' 
  }
}));

export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");

  const [type, setType] = React.useState("");

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleInput = (key, value) => {
      switch(key){
          case 'type':
              setType(value);
              break;
          default:        
      }
  }
  const [startedAt, setStartedAt] = React.useState(new Date());

  return (
    <div className={classes.root}>

      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>

        <ExpansionPanelSummary expandIcon={type && <ExpandMoreIcon />}>
            <Typography className={classes.heading}>{type}</Typography>
        </ExpansionPanelSummary>
        
        <ExpansionPanelDetails className={classes.expansionDetails}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="type">Type</InputLabel>
                <Select
                value={type}
                onChange={e => handleInput('type', e.target.value)}
                inputProps={{
                    name: 'type',
                    id: 'type',
                }}
                >
                    <MenuItem value={""}><em>None</em></MenuItem>
                    <MenuItem value={"Fermentation"}>Fermentation</MenuItem>
                    <MenuItem value={"Cooling"}>Cooling</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                autoOk
                ampm={false}
                value={startedAt}
                onChange={e => setStartedAt(e)}
                label="Process started at"
              />
              </MuiPickersUtilsProvider>
            </FormControl>
            <AddIngredients/>
        </ExpansionPanelDetails>
      </ExpansionPanel>

    </div>
  );
}