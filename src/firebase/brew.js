import React from 'react';
import firebase from './app';
import StatusContext from '../util/status';
import generatePattern from '../util/pattern';

const BrewContext = React.createContext();
export default BrewContext;

export function BrewProvider(props) {
  const { children } = props;
  const [status, setStatus] = React.useContext(StatusContext);

  const date = new Date();
  date.setMinutes(date.getMinutes() + 30);
  date.setMinutes(0);

  const initialBrew = {
    brewId: null,
    name: '',
    date,
    category: '',
    pattern: generatePattern(),
  };

  const getBrew = (brewId) => {
    setStatus((prev) => ({ ...prev, loading: true }));
    return firebase.firestore()
      .collection('brews')
      .doc(brewId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const brewData = doc.data();
          setStatus((prev) => ({ ...prev, loading: false }));

          // Make firebase date into javascript date
          brewData.date = new Date(brewData.date.seconds * 1000);
          return brewData;
        }
        return null;
      })
      .catch((error) => {
        setStatus((prev) => ({ ...prev, loading: false, error: error.message }));
        throw new Error(error);
      });
  };

  const updateBrew = (brew) => {
    setStatus((prev) => ({ ...prev, loading: true }));
    return firebase.firestore()
      .collection('brews').doc(brew.brewId)
      .set(brew)
      .then(() => {
        setStatus((prev) => ({ ...prev, loading: false, error: null }));
      })
      .catch((error) => {
        setStatus((prev) => ({ ...prev, loading: false, error: error.message }));
        throw new Error(error);
      });
  };

  const addBrew = (brew) => {
    setStatus((prev) => ({ ...prev, loading: true }));
    return firebase.firestore()
      .collection('brews')
      .add(brew)
      .then((ref) => {
        // Add generated id to brewId
        setStatus((prev) => ({ ...prev, loading: false, error: null }));
        const dbBrew = { ...brew, brewId: ref.id };
        dispatch({
          type: 'setStateBrew',
          brew: dbBrew,
        });
      })
      .catch((error) => {
        setStatus((prev) => ({ ...prev, loading: false, error: error.message }));
        throw new Error(error);
      });
  };

  const [brew, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'setStateBrew':
        return { ...action.brew };
      case 'addBrew':
        addBrew(action.brew);
        return state;
      case 'updateBrew':
        updateBrew(action.brew);
        return state;
      default:
        throw new Error(`unkown actiontype: ${action.type}`);
    }
  }, initialBrew);

  React.useEffect(() => {
    async function fetchFromDb() {
      const { brewId } = props;
      if (brewId) {
        const dbBrew = await getBrew(brewId);
        dispatch({
          type: 'setStateBrew',
          brew: dbBrew,
        });
      }
    }
    fetchFromDb();
  }, []);

  return (
    <BrewContext.Provider value={[brew, dispatch]}>
      {children}
    </BrewContext.Provider>
  );
}
