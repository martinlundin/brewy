import React from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { SET_ERRORS } from './../redux/types'
import generatePattern from '../util/pattern'
import BrewTile from './BrewTile'
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
        marginLeft: 'auto',
        marginRight: '0',
        margin: theme.spacing(1),
    },

}))

export default function StartBrew() {
    const dispatch = useDispatch()
    const classes = useStyles()

    const [brew, setBrew] = React.useContext(BrewContext)
    React.useEffect(() => {
        setBrew(prev => ({ ...prev, pattern: generatePattern()}))
    }, [])

    const FBCreateBrew = (data) => {
        Axios.post('/brew', data)
        .then((response) => {
            let brewId = response.data.id
            setBrew(prev => ({ ...prev, brewId}))
            window.history.pushState({}, document.title, `/brewery/${brewId}`);
        })
        .catch((error) => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data,
            })
        })
    }

    return (
        <Grid container justify={"center"} className={classes.container}>
            <Container maxWidth="sm">
                <GridList className={classes.gridList} >
                    <BrewTile pattern={brew.pattern} title={brew.category} date={brew.date.getDate()} month={brew.date.toLocaleString('default', {month: 'short'}).toLowerCase()}/>
                </GridList>
                <Paper className={classes.paper}>
                    <Grid item xs={12}>
                        <form autoComplete="off" >
                            <Button 
                            variant="outlined" 
                            color="secondary" 
                            className={classes.patternButton} 
                            onClick={() => setBrew(prev => ({ ...prev, 
                                pattern: generatePattern()
                            }))}
                            >
                                Generate pattern
                            </Button>
                            
                            <FormControl className={classes.formControl}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DateTimePicker
                                        autoOk
                                        ampm={false}
                                        value={brew.date}
                                        onChange={date => setBrew(prev => ({ ...prev, 
                                            date: date
                                        }))}
                                        label="Date"
                                        views={['date', 'hours']}
                                    />
                                </MuiPickersUtilsProvider>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="category">Category</InputLabel>

                                <Select
                                value={brew.category}
                                onChange={e => setBrew(prev => ({ ...prev, 
                                    category: e.target.value
                                }))}
                                inputProps={{
                                    name: 'category',
                                    id: 'category',
                                }}
                                >
                                    <MenuItem value={""}><em>None</em></MenuItem>
                                    <MenuItem value={"Beer"}>Beer</MenuItem>
                                    <MenuItem value={"Cider"}>Cider</MenuItem>
                                    <MenuItem value={"Kefir"}>Kefir</MenuItem>
                                    <MenuItem value={"Kombucha"}>Kombucha</MenuItem>
                                    <MenuItem value={"Mead"}>Mead</MenuItem>
                                    <MenuItem value={"Wine"}>Wine</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl className={classes.stepping}>
                                <Button  
                                className={classes.steppingButton} 
                                variant="contained" 
                                color="secondary" 
                                onClick={() => FBCreateBrew({
                                    pattern: brew.pattern,
                                    category: brew.category,
                                    date: brew.date,
                                })}
                                >
                                    Start
                                </Button>
                            </FormControl>

                        </form>
                    </Grid>
                </Paper>
                <Paper className={classes.infoPaper}>
                    <Typography variant="h5"><InfoOutlinedIcon /> All masterpieces starts somewhere</Typography>
                    <Typography paragraph={true}>And this is where you start yours. Give the brew a date and a category. The pattern is as a placeholder, you will be able to add an image and name the brew when it is completed.</Typography>
                </Paper>
            </Container>
        </Grid>
    )
}
