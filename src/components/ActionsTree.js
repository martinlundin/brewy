import React from 'react'

// Mui
import { makeStyles } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// Local
import ActionsContext from '../firebase/actions'
import ActionContext from '../firebase/action'
import BrewContext from '../firebase/brew'
import ActionDot from './ActionDot'

const useStyles = makeStyles(theme => ({
  actionTree: {
    display: 'flex',
    flexDirection: 'column',
  },
  add: {
    flex:1,
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  addVariant: {
    position: 'absolute',
    top: '35%',
    left: 'calc(50% + 50px)',
    transform: 'translate(-50%, -50%)',
    fontSize: '9px',
    color: theme.palette.primary.main,
  },
}))

export default function ActionsTree(props) {
  const classes = useStyles()

  const [brew] = React.useContext(BrewContext)
  const [actions, setActions] = React.useContext(ActionsContext)
  const [actionContext, setActionContext] = React.useContext(ActionContext)
  const [action, setAction] = React.useState(actionContext)
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

  const renderTree = (action) => {  
    return (
      <ActionDot action={action} key={action.actionId}>
        { 
          action.children && action.children.length > 0 ?
          action.children.map((child) => renderTree(child))
        :
        (<>
          <div className={classes.addVariant}><AddCircleOutlineIcon/> Variant</div>
          <div className={classes.add} onClick={() => {
            setActionContext(prev => ({...prev, brewId: brew.brewId, parent: action.actionId}))
            props.setOpenAction(true)}
          }>
            <AddCircleOutlineIcon/>
          </div>
        </>)
        }
      </ActionDot>
    )
  }
  return (
    <ActionDot action={{startedAt: brew.date, type: 'Started brew'}}>
    {
      nestedActions.length > 0 ?
        nestedActions.map((action) => {
          return renderTree(action)
        })
      :
        <div className={classes.add} onClick={() => {props.setOpenAction(true)}}><AddCircleOutlineIcon/></div>
    }
    </ActionDot>
  )
}
