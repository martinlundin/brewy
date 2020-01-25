import React from 'react';
import firebase from './app';
import StatusContext from '../util/status';
import generatePattern from '../util/pattern';

const BrewContext = React.createContext();
export default BrewContext;

const date = new Date();
date.setMinutes(date.getMinutes() + 30);
date.setMinutes(0);

export function BrewProvider(props) {
  const [status, setStatus] = React.useContext(StatusContext);

  const initialBrew = {
    brewId: null,
    name: '',
    date,
    category: '',
    pattern: generatePattern(),
  };
  const [brew, setBrew] = React.useState(initialBrew);

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
          console.log(brewData);
          setBrew(brewData);
        }
        return null;
      })
      .catch((error) => {
        setStatus((prev) => ({ ...prev, loading: false, error: error.message }));
        throw new Error(error);
      });
  };

  const updateBrew = (updatedBrew) => {
    setStatus((prev) => ({ ...prev, loading: true }));
    return firebase.firestore()
      .collection('brews').doc(updatedBrew.brewId)
      .set(updatedBrew)
      .then(() => {
        setStatus((prev) => ({ ...prev, loading: false, error: null }));
        setBrew(updatedBrew);
      })
      .catch((error) => {
        setStatus((prev) => ({ ...prev, loading: false, error: error.message }));
        throw new Error(error);
      });
  };

  const addBrew = (newBrew) => {
    setStatus((prev) => ({ ...prev, loading: true }));
    return firebase.firestore()
      .collection('brews')
      .add(newBrew)
      .then((ref) => {
        setStatus((prev) => ({ ...prev, loading: false, error: null }));
        // Add generated id to brewId and update it
        updateBrew({ ...newBrew, brewId: ref.id });
      })
      .catch((error) => {
        setStatus((prev) => ({ ...prev, loading: false, error: error.message }));
        throw new Error(error);
      });
  };

  React.useEffect(() => {
    if (props.brewId) {
      getBrew(props.brewId);
    }
  }, []);
  React.useEffect(() => {
    console.log(brew);
  }, [brew]);

  return (
    <BrewContext.Provider value={{
      brew, getBrew, addBrew, updateBrew,
    }}
    >
      {props.children}
    </BrewContext.Provider>
  );
}
