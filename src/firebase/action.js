import React from 'react';
import firebase from './app';
import StatusContext from '../util/status';
import BrewContext from './brew';
import ActionsContext from './actions';

const ActionContext = React.createContext();
export default ActionContext;

export function ActionProvider(props) {
  const [status, setStatus] = React.useContext(StatusContext);
  const [actions, setActions] = React.useContext(ActionsContext);

  const startedAt = new Date();
  startedAt.setMinutes(startedAt.getMinutes() + 30);
  startedAt.setMinutes(0);

  const initialAction = {
    brewId: null,
    actionId: null,
    type: '',
    startedAt,
    parent: null,
  };
  const [action, setAction] = React.useState(initialAction);

  React.useEffect(() => {
    const { actionId } = action;
    if (actionId) {
      getAction(actionId);
    }
  }, []);

  const setInitialAction = () => {
    setAction(initialAction);
  };
  const startChildAction = (actionId) => {
    setAction({ ...initialAction, parent: actionId });
  };
  const getAction = (actionId) => {
    setStatus((prev) => ({ ...prev, loading: true }));
    firebase.firestore()
      .collection('actions')
      .doc(actionId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const actionData = doc.data();
          setStatus((prev) => ({ ...prev, loading: false, error: null }));

          // Make firebase date into javascript date
          actionData.startedAt = new Date(actionData.startedAt.seconds * 1000);
          setAction(actionData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addAction = (newAction) => {
    setStatus((prev) => ({ ...prev, loading: true }));
    firebase.firestore()
      .collection('actions')
      .add(newAction)
      .then((ref) => {
        // Add generated id to actionId, this will trigger another call to update the action again
        const actionData = { ...newAction, actionId: ref.id };
        setActions((prev) => ([...prev, actionData]));
        setStatus((prev) => ({ ...prev, loading: false, error: null }));
        setAction(actionData);
        updateAction(actionData);
      })
      .catch((error) => {
        console.error(error);
        setStatus((prev) => ({ ...prev, loading: false, error: error.message }));
      });
  };

  const updateAction = (updatedAction) => {
    setStatus((prev) => ({ ...prev, loading: true }));
    firebase.firestore()
      .collection('actions').doc(updatedAction.actionId)
      .set(updatedAction)
      .then(() => {
        setStatus((prev) => ({ ...prev, loading: false, error: null }));
        setAction(updatedAction);
        // setActions(prev => ([...prev, action]))
      })
      .catch((error) => {
        console.error(error);
        setStatus((prev) => ({ ...prev, loading: false, error: error.message }));
      });
  };

  return (
    <ActionContext.Provider value={{
      action, addAction, updateAction, initialAction,
    }}
    >
      {props.children}
    </ActionContext.Provider>
  );
}
