import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core'
import generatePattern from '../util/pattern'
import { useDispatch } from 'react-redux'
import Axios from 'axios'
import { SET_ERRORS } from '../redux/types'


export default function CreateBrew() {
    const useStyles = makeStyles(theme => ({
        paper: {
            padding: theme.spacing(3,2),
            width: "100%",
            maxWidth: "500px"
        },
        container: {
            padding: theme.spacing(2),
        },
        formControl: {
            width: "100%",
        },
        avatar: {
            marginLeft: "auto",
            marginRight: "auto",
            color: theme.palette.common.white,
            background: `url(${pattern})`,
            backgroundSize: "cover",
            width: 60,
            height: 60,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "18px",
            textShadow: "1px 1px 2px black",
            boxShadow: "1px 1px 10px black",
            flexDirection: "column",
            paddingTop: "10px",
        },
        number: {
            fontSize: "28px",
            lineHeight: "22px"
        },
        month: {
            fontSize: "13px",
        }
    }))

    const [pattern, setPattern] = React.useState(generatePattern());
    const [category, setCategory] = React.useState("");
    const [brewId, setBrewId] = React.useState("");

    const classes = useStyles()
    
    const dispatch = useDispatch()
    const handleCategory = (e) => {
        setCategory(e.target.value)
        if(brewId){
            updateBrew(brewId, {category: e.target.value})
        }else{
            createNewBrew({
                pattern: pattern,
                category: e.target.value
            })
        }
        
    }
    const createNewBrew = (data) => {
        Axios.post('/brew', data)
        .then((response) => {
            setBrewId(response.data.id)
        })
        .catch((error) => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data,
            })
        })
    }
    const updateBrew = (brewId, data) => {
        Axios.put(`/brew/${brewId}`, data)
        .then((response) => {
            console.log(response.data)
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
            <Paper className={classes.paper}>
                <Grid item xs={12}>
                    <form autoComplete="off" >
                        <Avatar className={classes.avatar}><span className={classes.number}>11</span><span className={classes.month}>SEP</span></Avatar>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="category">Category</InputLabel>
                            <Select
                            value={category}
                            onChange={e => handleCategory(e)}
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
                    </form>
                </Grid>
            </Paper>
        </Grid>
    )
}
