import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    tile: {
        display: 'flex',
        height: '150px',
        width: '150px',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.common.white,
      },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    dateWrap: {
        position:'absolute',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        textShadow: '1px 1px 1px rgba(0,0,0,0.7)',
    },
    date: {
        fontSize: '40px',
    },
    month: {
        fontSize: '25px',
        position: 'relative',
        top: '-20px',
    },
    rating: {
        color: theme.palette.common.white,
        textAlign: 'center',
        marginRight: theme.spacing(2)
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

export default function BrewTile(props) {
    const classes = useStyles()
    return (
        <GridListTile className={classes.tile}>
            <img src={props.pattern}/>
            <div className={classes.dateWrap}>
                <Typography className={classes.date}>{props.date}</Typography>
                <Typography className={classes.month}>{props.month}</Typography>
            </div>
            <GridListTileBar
              title={props.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={<Typography className={classes.rating}>{props.rating}</Typography>}
            />
          </GridListTile>
    )
}
