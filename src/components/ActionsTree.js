import React from 'react';

// Mui
import { makeStyles } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';


// Local
import ActionsContext from '../firebase/actions';
import BrewContext from '../firebase/brew';
import ActionDot from './ActionDot';
import EditAction from './EditAction';

const useStyles = makeStyles((theme) => ({
  actionTree: {
    display: 'flex',
    flexDirection: 'column',
  },
  add: {
    flex: 1,
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
}));

export default function ActionsTree(props) {
  const classes = useStyles();

  const { brew } = React.useContext(BrewContext);
  const [actions, setActions] = React.useContext(ActionsContext);
  const [nestedActions, setNestedActions] = React.useState([]);

  const [parent, setParent] = React.useState(null);
  const [showActionPanel, setShowActionPanel] = React.useState(false);

  const openEditAction = (currentParent = null) => {
    setShowActionPanel(true);
    setParent(currentParent);
  };
  const closeEditAction = () => {
    setShowActionPanel(false);
    setParent(null);
  };
  // Nest data, so we can loop through it and create DOM tree
  function nest(array) {
    const map = {};
    for (let i = 0; i < array.length; i += i + 1) {
      const obj = array[i];
      obj.children = [];

      map[obj.actionId] = obj;

      const parent = obj.parent || '-';
      if (!map[parent]) {
        map[parent] = {
          children: [],
        };
      }
      map[parent].children.push(obj);
    }
    return map['-'].children;
  }

  React.useEffect(() => {
    if (actions.length > 0) {
      console.log(actions);
      console.log(nest(actions));
      setNestedActions(nest(actions));
    }
  }, [actions]);

  const renderTree = (currentAction) => (
    <ActionDot action={currentAction} key={currentAction.actionId}>
      {
          currentAction.children && currentAction.children.length > 0
            ? currentAction.children.map((child) => renderTree(child))
            : (
              <>
                <div className={classes.addVariant}>
                  <AddCircleOutlineIcon />
                  {' '}
                  Variant
                </div>
                <button
                  type="button"
                  className={classes.add}
                  onClick={() => {
                    openEditAction(currentAction.actionId);
                  }}
                >
                  <AddCircleOutlineIcon />
                </button>
              </>
            )
        }
    </ActionDot>
  );
  return (
    <div>
      <ActionDot action={{ startedAt: brew.date, type: 'Started brew' }}>
        {
      nestedActions.length > 0
        ? nestedActions.map((currentAction) => renderTree(currentAction))
        : (
          <button type="button" className={classes.add} onClick={() => { openEditAction(); }}>
            <AddCircleOutlineIcon />
          </button>
        )
    }
      </ActionDot>
      <Modal
        className={classes.wrap}
        aria-labelledby="Edit action"
        open={showActionPanel}
        onClose={() => { closeEditAction(); }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showActionPanel}>
          <EditAction closeEditAction={closeEditAction} parent={parent} />
        </Fade>
      </Modal>
    </div>

  );
}
