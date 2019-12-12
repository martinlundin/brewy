import React from 'react';
import firebase from './app';
import StatusContext from '../util/status'
import BrewContext from '../firebase/brew'
import ActionsContext from '../firebase/actions'

const ActionContext = React.createContext();
export default ActionContext;

export function ActionProvider(props) {
  const [status, setStatus] = React.useContext(StatusContext)
  const [actions, setActions] = React.useContext(ActionsContext)
  
  const startedAt = new Date();
  startedAt.setMinutes(startedAt.getMinutes() + 30);
  startedAt.setMinutes(0);

  const [action, setAction] = React.useState({
    brewId: null,
    actionId: null,
    type: '',
    startedAt,
  });

  React.useEffect(() => {
    const actionId = action.actionId
    if(actionId){
      firebase.firestore()
      .collection('actions')
      .doc(actionId)
      .get()
      .then(doc => {
          if (doc.exists) {
            let actionData = doc.data();

            // Make firebase date into javascript date
            actionData.startedAt = new Date(actionData.startedAt.seconds*1000)
            setAction(actionData)
          } 
      })
      .catch(error => {
        console.error(error)
      })
    }
  }, [])

  React.useEffect(() => {

    console.log(action)

    if(action.actionId){

      setStatus(prev => ({...prev, loading: true}))
      firebase.firestore()
      .collection('actions').doc(action.actionId)
      .set(action)
      .then(() => {
          setStatus(prev => ({...prev, loading: false, error: null}));
          //setActions(prev => ([...prev, action]))
      })
      .catch(error => {
          console.error(error)
          setStatus(prev => ({...prev, loading: false, error: error.message}))
      })

    } else if(action.brewId) {

      setStatus(prev => ({...prev, loading: true}))
      firebase.firestore()
      .collection('actions')
      .add(action)
      .then(ref => {
        // Add generated id to actionId, this will trigger another call to update the action again
        setAction({...action, actionId: ref.id})
        setActions(prev => ([...prev, action]))
        setStatus(prev => ({...prev, loading: false, error: null}))
      })
      .catch(error => {
        console.error(error)
        setStatus(prev => ({...prev, loading: false, error: error.message}))
      })
      
    }
  }, [action])

  return (
    <ActionContext.Provider value={[action, setAction]}>
      {props.children}
    </ActionContext.Provider>
  );
}
