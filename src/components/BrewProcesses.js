import React from 'react'
import { BrewContext } from './../pages/Brewery'
import Axios from 'axios'
import BrewTile from './BrewTile'
import ProcessForm from './ProcessForm'

import { useDispatch, useSelector } from 'react-redux'
import { LOADING_UI, SET_ERRORS, CLEAR_ERRORS } from './../redux/types'

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
    paper: {
        padding: theme.spacing(3,2),
        margin: theme.spacing(2, 0),
        width: "100%",
    },
    infoPaper: {
        padding: theme.spacing(3,2),
        margin: theme.spacing(2, 0),
        width: "100%",
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    container: {
        padding: theme.spacing(2),
    },
    formGrid: {
        margin: theme.spacing(2, 0),
    },
    gridList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    formControl: {
        width: "100%",
        margin: theme.spacing(1, 0),
    },
    patternButton: {
        display: 'flex',
        margin: '0 auto',
    },
    stepping: {
        width: '100%',
    },
    steppingButton: {
        display: 'flex',
        width: '100%',
        marginLeft: 'auto',
        marginRight: '0',
        margin: theme.spacing(1),
    },
    loadingIconWrap: {
        width: '100%',
        textAlign: 'center',
    },
}))

export default function BrewProcesses(props) {
    const [brew, setBrew] = React.useContext(BrewContext)
    const dispatch = useDispatch()
    const classes = useStyles()
    const ui = useSelector((state) => state.ui)

    const [expanded, setExpanded] = React.useState('new');
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    React.useEffect(() => {
        //If there is no pattern, get brew from FB
        if(!brew.pattern){
            dispatch({ type: LOADING_UI })
            Axios.get(`/brew/${brew.brewId}`)
            .then(response => {
                dispatch({ type: CLEAR_ERRORS })
                // Parse date to be accessible
                let processes = response.data.processes.map(process => {
                    process.startedAt = new Date(process.startedAt)
                    return process
                })
                let date = new Date(response.data.date)
                setBrew({ 
                    ...response.data, 
                    date,
                    processes,
                })
            })
            .catch((error) => {
                console.log(error)
                dispatch({
                    type: SET_ERRORS,
                    payload: error.response.data,
                })
            })
        }
    }, [])
    
    return (
        <Grid container justify={"center"} className={classes.container}>
            <Container maxWidth="sm">
                <GridList className={classes.gridList} >
                    <BrewTile pattern={brew.pattern} title={brew.category} date={brew.date.getDate()} month={brew.date.toLocaleString('default', {month: 'short'}).toLowerCase()}/>
                </GridList>
                    <Grid item xs={12} className={classes.formGrid}>
                        {ui.loading && 
                            <div className={classes.loadingIconWrap}>
                                <CircularProgress size={20} className={classes.loadingIcon}/>
                            </div> 
                        }
                        <form autoComplete="off" >

                            {brew.processes &&
                                brew.processes.map(process => (
                                    <ProcessForm 
                                    key={process.processId}
                                    expanded={expanded} 
                                    handleChange={handleChange.bind()} 
                                    processId={process.processId} 
                                    type={process.type} 
                                    startedAt={process.startedAt} 
                                    />
                            ))}
                            <ProcessForm expanded={expanded} handleChange={handleChange.bind()}/>

                        </form>
                           
                    </Grid>
                <Paper className={classes.infoPaper}>
                    <Typography variant="h5"><InfoOutlinedIcon />Every practice was a learning process</Typography>
                    <Typography paragraph={true}>When you do something with your brew, add a process here to keep track on what works best.</Typography>
                </Paper>
                <FormControl className={classes.stepping}>
                    <Button  
                    className={classes.steppingButton} 
                    variant="contained" 
                    color="secondary" 
                    >
                        Complete brew
                    </Button>
                </FormControl>
            </Container>
        </Grid>
    )
}
