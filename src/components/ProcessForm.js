import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrewContext } from './../pages/Brewery'
import { LOADING_UI, CLEAR_ERRORS, SET_ERRORS } from './../redux/types'
import Axios from 'axios'

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
import ProcessIngredientForm from './ProcessIngredientsForm'

const useStyles = makeStyles(theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
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
    const dispatch = useDispatch()

    const date = new Date()
    date.setMinutes(date.getMinutes() + 30);
    date.setMinutes(0);

    const [process, setProcess] = React.useState({ 
        ...props.process,
        type: (props.process && props.process.type ? props.process.type : ''),
        startedAt: (props.process && props.process.startedAt ? props.process.startedAt : date),
    })
    
    const [changed, setChanged] = React.useState(false)
    const [key, setKey] = React.useState((props.process && props.process.processId ? props.process.processId : 'new'))

    const FBCreateProcess = (data) => {
        dispatch({ type: LOADING_UI })
        Axios.post('/process', data)
        .then((response) => {
            dispatch({ type: CLEAR_ERRORS })
            setBrew(prev => {
                data.startedAt = new Date(data.startedAt)
                data.processId = response.data.id
                prev.processes.push(data)
                return { ...prev }
            })
        })
        .catch((error) => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data,
            })
        })
    }
    const FBUpdateProcess = (data) => {
        dispatch({ type: LOADING_UI })
        Axios.put(`/process/${data.processId}`, data)
        .then((response) => {
            dispatch({ type: CLEAR_ERRORS })
            setBrew(prev => {
                data.startedAt = new Date(data.startedAt)
                let processes = prev.processes.map(process => {
                    if(process.processId === data.processId){
                        return data
                    } else {
                        return process
                    }
                })
                console.log({ ...prev, processes })
                return { ...prev, processes }
            })
        })
        .catch((error) => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data,
            })
        })
    }
    const handleSubmit = () => {
        setChanged(false)
        if(process.processId){
            FBUpdateProcess({
                processId: process.processId,
                brewId: brew.brewId,
                type: process.type,
                startedAt: process.startedAt.toISOString(),
            })
        } else {
            FBCreateProcess({
                brewId: brew.brewId,
                type: process.type,
                startedAt: process.startedAt.toISOString(),
            })
            setProcess({
                type: '',
                startedAt: date, 
            }) 
        }
    }
    const handleChange = (key, value) => {
        setChanged(true)
        setProcess(prev => ({
            ...prev,
            [key]: value,
        }))
    }

    React.useEffect(() => {
        
    }, [])

    return (
        <ExpansionPanel expanded={props.expanded === key} onChange={props.handleChange(key)}>

            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{(changed && process.processId && <span>&#9679;</span>)} {process.startedAt.getDate()} {process.startedAt.toLocaleString('default', {month: 'short'})}</Typography>
                <Typography className={classes.secondaryHeading}>{process.type}</Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails className={classes.expansionDetails}>
                <FormControl className={classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        autoOk
                        ampm={false}
                        value={process.startedAt}
                        onChange={e => handleChange('startedAt', e)}
                        label="Process started at"
                        views={['date', 'hours']}
                    />
                    </MuiPickersUtilsProvider>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="type">Type</InputLabel>
                    <Select
                    value={process.type}
                    onChange={e => handleChange('type', e.target.value)}
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
                
                {process.ingredients &&
                    process.ingredients.map(ingredient => (
                        <ProcessIngredientForm 
                        key={ingredient.ingredientId}
                        
                        />
                ))}
                <ProcessIngredientForm/>

                <FormControl className={classes.stepping}>
                    <Button  
                    className={classes.steppingButton} 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleSubmit()}
                    disabled={!changed}
                    >
                        {(process.processId ? 'Save' : 'Add Process')}
                    </Button>
                </FormControl>


            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}
