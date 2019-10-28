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
      firebase.firestore()
      .collection('brews')
      .doc(brewId)
      .get()
      .then(doc => {
          if (doc.exists) {
            let brewData = doc.data();

            // Make sure brew has brewId
            brewData.brewId = (brewData.brewId ? brewData.brewId : doc.id);
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

  return (
    <BrewContext.Provider value={[brew, setBrew]}>
      {props.children}
    </BrewContext.Provider>
  );
}
