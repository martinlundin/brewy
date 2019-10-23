import React from 'react';

export const StatusContext = React.createContext();

export function StatusProvider({ children }) {
  const initialStatus = {
    error: null,
    message: null,
    loading: false,
  };

  const [status, setStatus] = React.useState(initialStatus);

  return (
    <StatusContext.Provider value={[status, setStatus]}>
      {children}
    </StatusContext.Provider>
  );
}
