import React from 'react'
import { BrewContext } from './../pages/Brewery'

// MUI 
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'
import GridList from '@material-ui/core/GridList';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '70%',
        flexShrink: 0,
    },
    formControl: {
        width: "100%",
    },
    expansionDetails: {
        flexFlow: 'wrap' 
    },
    stepping: {
        width: '100%',
    },
    steppingButton: {
        display: 'flex',
        marginLeft: 'auto',
        marginRight: '0',
        margin: theme.spacing(1),
    },
}));
export default function ProcessForm(props) {
    const [brew, setBrew] = React.useContext(BrewContext)
    const classes = useStyles()

    const [type, setType] = React.useState((props.type ? props.type : ''))
    const [startedAt, setStartedAt] = React.useState(props.startedAt)
    const [changed, setChanged] = React.useState(false)

    React.useEffect(() => {
        if(!props.startedAt){
            // Date as closest hour
            const date = new Date()
            date.setMinutes(date.getMinutes() + 30);
            date.setMinutes(0);
            setStartedAt(date)
        }
    }, [])

    return (
        <>
            <FormControl className={classes.formControl}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                    autoOk
                    ampm={false}
                    value={startedAt}
                    onChange={e => {setStartedAt(e); setChanged(true)}}
                    label="Process started at"
                    views={['date', 'hours']}
                />
                </MuiPickersUtilsProvider>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="type">Type</InputLabel>
                <Select
                value={type}
                onChange={e => {setType(e.target.value); setChanged(true)}}
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
            
            <FormControl className={classes.stepping}>
                <Button  
                className={classes.steppingButton} 
                variant="contained" 
                color="secondary" 
                onClick={() => {console.log('asd')}}
                disabled={!changed}
                >
                    Save
                </Button>
            </FormControl>
        </>
    )
}
