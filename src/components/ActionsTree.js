import React from 'react'

// Mui
import { makeStyles } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// Local
import ActionsContext from '../firebase/actions'

const useStyles = makeStyles(theme => ({
  actionTree: {
    display: 'flex',
    flexDirection: 'column',
  },
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
  add: {
    flex:1,
    color: theme.palette.primary.main,
  },
  addVariant: {
    position: 'absolute',
    top: '35%',
    left: 'calc(50% + 50px)',
    transform: 'translate(-50%, -50%)',
    fontSize: '9px',
    color: theme.palette.primary.main,
  },
  type: {
    fontSize: '10px'
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

export default function ActionsTree() {
  const classes = useStyles()

  const [actions, setActions] = React.useContext(ActionsContext)
  const [nestedActions, setNestedActions] = React.useState([])
  
  // Nest data, so we can loop through it and create DOM tree
  function nest(array){
    var map = {};
    for(var i = 0; i < array.length; i++){
        var obj = array[i];
        obj.children= [];

        map[obj.actionId] = obj;

        var parent = obj.parent || '-';
        if(!map[parent]){
            map[parent] = {
                children: []
            };
        }
        map[parent].children.push(obj);
    }
    return map['-'].children;
  }

  React.useEffect(() => {
    if(actions.length > 0){
      setNestedActions(nest(actions))
    }
  }, [actions])

  React.useEffect(() => {

  }, [nestedActions])

  const renderTree = (action) => {  
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
        <div className={classes.type}>
          {action.type}
        </div>
      </div>
      { action.children && action.children.length > 0 ?
          action.children.map((child) => renderTree(child))
        :
        (<>
          <div className={classes.addVariant}><AddCircleOutlineIcon/> Variant</div>
          <div className={classes.add}><AddCircleOutlineIcon/></div>
        </>)
      }
    </div>
    )
  }
  return (
    <div className={classes.actionTree}>
      <div className={classes.action}>
        <div className={classes.dataWrap}>
          <div className={classes.circle}>
            <span className={classes.date}>
              11     
            </span>
            <span className={classes.month}>
              okt
            </span>
          </div>
          <div className={classes.type}>
            Base
          </div>
        </div>
        {nestedActions.map((action) => {
            return renderTree(action)
        })}
      </div>
    </div>
  )
}
