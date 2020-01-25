import React from 'react';
import firebase from './app';
import BrewContext from './brew';
import StatusContext from '../util/status';

const ActionsContext = React.createContext();
export default ActionsContext;

export function ActionsProvider(props) {
  const [status, setStatus] = React.useContext(StatusContext);
  const { brew } = React.useContext(BrewContext);

  const [actions, setActions] = React.useState([]);

  React.useEffect(() => {
    if (brew.brewId) {
      setStatus((prev) => ({ ...prev, loading: true }));
      firebase.firestore()
        .collection('actions')
        .where('brewId', '==', brew.brewId)
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            const actionsData = [];
            snapshot.forEach((doc) => {
              const actionData = doc.data();
              actionsData.push({
                ...actionData,
                actionId: doc.id,
                startedAt: new Date(actionData.startedAt.seconds * 1000),
              });
            });
            setActions(actionsData);
          }
          setStatus((prev) => ({ ...prev, loading: false, error: null }));
        })
        .catch((error) => {
          console.error(error);
          setStatus((prev) => ({ ...prev, loading: false, error: error.message }));
        });
    }
  }, [brew]);

  return (
    <ActionsContext.Provider value={[actions, setActions]}>
      {props.children}
    </ActionsContext.Provider>
  );
}
