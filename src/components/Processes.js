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
      width: "100%",
  }
}));

export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");

  const [type, setType] = React.useState("");

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>

      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>

        <ExpansionPanelSummary expandIcon={type && <ExpandMoreIcon />}>
            <Typography className={classes.heading}>{type}</Typography>
        </ExpansionPanelSummary>
        
        <ExpansionPanelDetails>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="type">Type</InputLabel>
                <Select
                value={type}
                onChange={e => setType(e.target.value)}
                inputProps={{
                    name: 'type',
                    id: 'type',
                }}
                >
                    <MenuItem value={""}><em>None</em></MenuItem>
                    <MenuItem value={"Fermentation"}>Fermentation</MenuItem>
                    <MenuItem value={"Second Fermentatation"}>Second Fermentation</MenuItem>
                    <MenuItem value={"Cooling"}>Cooling</MenuItem>
                </Select>
            </FormControl>
            
        </ExpansionPanelDetails>
      </ExpansionPanel>

    </div>
  );
}