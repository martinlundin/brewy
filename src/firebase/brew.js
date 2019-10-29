import React from 'react';
import firebase from './app';
import StatusContext from '../util/status'

const BrewContext = React.createContext();
export default BrewContext;

export function BrewProvider(props) {
  const [status, setStatus] = React.useContext(StatusContext)

  const [brew, setBrew] = React.useState({
    brewId: null,
    name: '',
    date: new Date(),
    category: '',
    pattern: '',
  });

  React.useEffect(() => {
    const brewId = props.brewId
    if(brewId){
      firebase.firestore()
      .collection('brews')
      .doc(brewId)
      .get()
      .then(doc => {
          if (doc.exists) {
            let brewData = doc.data();

            // Make firebase date into javascript date
            brewData.date = new Date(brewData.date.seconds*1000)
            setBrew(brewData)
          } 
      })
      .catch(error => {
        console.error(error)
      })
    }
  }, [])

  React.useEffect(() => {

    if(brew.brewId){

      setStatus(prev => ({...prev, loading: true}))
      firebase.firestore()
      .collection('brews').doc(brew.brewId)
      .set(brew)
      .then(() => {
          setStatus(prev => ({...prev, loading: false, error: null}))
      })
      .catch(error => {
          console.error(error)
          setStatus(prev => ({...prev, loading: false, error: error.message}))
      })

    } else if(brew.pattern) {

      setStatus(prev => ({...prev, loading: true}))
      firebase.firestore()
      .collection('brews')
      .add(brew)
      .then(ref => {
        // Add generated id to brewId, this will trigger another call to update the brew again
        setBrew({...brew, brewId: ref.id})
        setStatus(prev => ({...prev, loading: false, error: null}))
      })
      .catch(error => {
        console.error(error)
        setStatus(prev => ({...prev, loading: false, error: error.message}))
      })
      
    }
  }, [brew])

  return (
    <BrewContext.Provider value={[brew, setBrew]}>
      {props.children}
    </BrewContext.Provider>
  );
}
