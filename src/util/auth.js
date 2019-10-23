import React from 'react';
import firebase from './firebase';

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(true);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser((user || false));
    });
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  );
}
