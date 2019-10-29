import React from 'react'
import BrewContext from '../firebase/brew'
import Axios from 'axios'
import BrewTile from './BrewTile'

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

// Local
import Loader from './Loader'
import ActionsTree from './ActionsTree'

const useStyles = makeStyles(theme => ({
    grid: {
        margin: theme.spacing(2, 0),
    },
    gridList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
}))

export default function BrewProcesses(props) {
    const classes = useStyles()

    const [brew, setBrew] = React.useContext(BrewContext)

    const [expanded, setExpanded] = React.useState('new');
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    React.useEffect(() => {

    }, [])
    
    return (
        <Container maxWidth="sm">
            <GridList className={classes.gridList}>
                <BrewTile pattern={brew.pattern} title={brew.category} date={brew.date.getDate()} month={brew.date.toLocaleString('default', {month: 'short'}).toLowerCase()}/> 
            </GridList>
            <Grid item xs={12} className={classes.grid}>
                <Loader />

                <ActionsTree />

            </Grid>
            <Paper>
                <Typography variant="h5" gutterBottom={true}><InfoOutlinedIcon /> Every practice was a learning process</Typography>
                <Typography>When you do something with your brew, add a process or a variant process. As the name suggest, a variant is a "fork" of your brew. This makes it simple to keep track of brewing experiments.</Typography>
            </Paper>
        </Container>
    )
}
