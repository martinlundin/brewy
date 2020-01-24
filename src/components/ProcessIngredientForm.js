import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextSuggest from './TextSuggest'
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { LOADING_UI, CLEAR_ERRORS, SET_ERRORS } from './../redux/types'
import { BrewContext } from './../pages/Brewery'
import Axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    margin: theme.spacing(2, 0),
    flexWrap: 'nowrap',
  },
  container: {
    position: 'relative',
    marginTop: theme.spacing(2),
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(2),
  },
  input: {
      flex: '0 0 85%',
      display: 'flex',
      flexWrap: 'wrap',
      padding: theme.spacing(1),
  },
  ingredient: {
    flex: '0 0 100%',
  },
  amount: {
    flex: '0 0 50%',
    marginTop: '0',
    marginBottom: '0',
  },
  measurement: {
    flex: '0 0 50%',
  },
  addButton: {
    flex: '0 0 15%',
    color: theme.palette.common.white,
    background: "#333333",
    position: 'relative',
    zIndex: 2,
    height:'100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
}));

export default function ProcessIngredientForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const brew = React.useContext(BrewContext)

  const ingredientSuggestions = [
    { label: 'Water' },
    { label: 'Kefir' },
    { label: 'Honey' },
    { label: 'Lemon' },
    { label: 'Sugar' },
  ]
  const [processId, setProcessId] = React.useState(props.processId)
  const [name, setName] = React.useState('')
  const handleName = name => (event, { newValue }) => {
    setName(newValue);
  };

  const measurementSuggestions = [
    { label: 'krm' },
    { label: 'msk' },
    { label: 'tsk' },
    { label: 'ml' },
    { label: 'cl' },
    { label: 'dl' },
    { label: 'liter' },
    { label: 'mg' },
    { label: 'g' },
    { label: 'kg' },
    { label: 'st' },
 ]
  const [measurement, setMeasurement] = React.useState('')
  const handleMeasurement = name => (event, { newValue }) => {
    setMeasurement(newValue);
  };

  const [amount, setAmount] = React.useState('')

  const FBAddIngredient = (data) => {
    dispatch({ type: LOADING_UI })
    Axios.post(`/process/${processId}/ingredient/add`, data)
    .then((response) => {
        dispatch({ type: CLEAR_ERRORS })
        setBrew(prev => {
            let processes = prev.processes.map(process => {
              if(processId === process.processId){
                process.ingredients.push(data)
                return process
              } else {
                return process
              }
            })
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
    FBAddIngredient({
      name,
      amount,
      measurement,
    })
  }

  return (
    <Paper className={classes.root}>
        <div className={classes.input}>
            <TextSuggest className={classes.ingredient} suggestions={ingredientSuggestions} handleChange={handleName.bind()} value={name} label='Ingredient'/>
            <TextField
            label="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            type="number"
            className={classes.amount}
            margin="normal"
            />
            <TextSuggest className={classes.measurement} suggestions={measurementSuggestions} handleChange={handleMeasurement.bind()} value={measurement} label='Measurement'/>
        </div>
        <span className={classes.addButton}>
            <AddIcon onClick={() => handleSubmit()} />
        </span>
    </Paper>
  );
}
