import React from 'react';
import firebase from './app';

const BrewContext = React.createContext();
export default BrewContext;

export function BrewProvider(props) {
  const [brew, setBrew] = React.useState({
    name: '',
    date: new Date(),
    category: '',
    pattern: '',
  });

  React.useEffect(() => {
    const brewId = props.brewId
    if(brewId){
      let brewData;

      firebase.firestore()
      .collection('brews')
      .doc(brewId)
      .get()
      .then(doc => {
          if (doc.exists) {
            brewData = doc.data();
            brewData.brewId = doc.id;
            return firebase.firestore().collection('processes').where('brewId', '==', brewId).orderBy('startedAt', 'asc').get()
          } 
      })
      .then(data => {
        // Todo check it actually works
        brewData.processes = Array.from(data).map(doc => {
            return {...doc.data(), processId: doc.id}
        })

        // Parse date to be accessible
        let processes = brewData.processes.map(process => ({...process, startedAt: new Date(process.startedAt)}))
        let date = new Date(brewData.date.seconds*1000)

        setBrew({ 
            ...brewData, 
            date,
            processes,
        })
      })
      .catch(error => {
        console.error(error)
      })
    }
  }, [])

  return (
    <BrewContext.Provider value={[brew, setBrew]}>
      {props.children}
    </BrewContext.Provider>
  );
}
