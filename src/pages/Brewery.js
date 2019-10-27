import React from 'react';
import StartBrew from '../components/StartBrew'
import BrewProcesses from '../components/BrewProcesses'

import firebase from '../util/firebase'

export const BrewContext = React.createContext();

export default function Brewery(props) {
  const [brew, setBrew] = React.useState({
    name: '',
    date: new Date(),
    category: '',
    pattern: '',
    processes: [],
    rating: null,
    ratings: {},
  });
  
  React.useEffect(() => {
    const brewId = props.match.params.brewId
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
      {props.match.params.brewId ? 
        <BrewProcesses />
      : 
        <StartBrew />
      }
    </BrewContext.Provider>
  );
}
