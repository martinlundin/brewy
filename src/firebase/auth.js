import React from 'react';
import firebase from './app';

export const AuthContext = React.createContext();
export default AuthContext;

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(true);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser((user || false));
    });
  }, []);

  React.useEffect(() => {
    if (currentUser && currentUser.uid && !currentUser.profile) {
      firebase.firestore().collection('users').doc(currentUser.uid).get()
        .then((doc) => {
          if (doc.exists) {
            setCurrentUser((prev) => ({ ...prev, profile: doc.data() }));
          } else {
            console.log('Profile not found');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [currentUser]);


  return (
    <AuthContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </AuthContext.Provider>
  );
}
