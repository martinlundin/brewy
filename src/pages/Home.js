import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    
    home: {
        textAlign: "center",
    }

}));

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.home}>
            <h1>Home</h1>
        </div>
    )
}
