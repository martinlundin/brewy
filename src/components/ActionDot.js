import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  action: {
    display: 'flex',
    flexFlow: 'row wrap',
    flex: 1,
    alignItems: 'flex-start',
    position: 'relative',
  },
  circle: {
    background: 'red',
    display: 'inline-flex',
    height: '35px',
    width: '35px',
    borderRadius: '9999px',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    background: theme.palette.primary.main,
    color: theme.palette.background.paper,
  },
  dataWrap: {
    flex: '1 100%',
    padding: '5px',
    color: theme.palette.primary.main,
  },
  type: {
    display: 'inline-block',
    padding: '1px 4px',
    margin: '2px',
    borderRadius: '3px',
    fontSize: '10px',
    background: theme.palette.primary.main,
    color: theme.palette.background.paper,
  },
  date: {
    fontSize: '18px',
    position: 'relative',
    top: '-2px',
  },
  month: {
    position: 'absolute',
    bottom: '8px',
    lineHeight: 0,
    fontSize: '10px',
  }
}))

export default function ActionDot(props) {
  const classes = useStyles()

  const action = props.action;

  return (
    <div className={classes.action} key={action.actionId}>
      <div className={classes.dataWrap}>
        <div className={classes.circle}>
          <span className={classes.date}>
            {action.startedAt.getDate()}      
          </span>
          <span className={classes.month}>
            {action.startedAt.toLocaleString('default', {month: 'short'}).toLowerCase()}
          </span>
        </div>
        <div>
          <div className={classes.type}>
            {action.type}
          </div>
        </div>
      </div>
      {props.children}
    </div>
  )
}
