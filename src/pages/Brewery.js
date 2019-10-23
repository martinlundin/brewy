import React from 'react';

export const BrewContext = React.createContext();

export default function Brewery() {
  // Date as closest hour
  const date = new Date();
  date.setMinutes(date.getMinutes() + 30);
  date.setMinutes(0);
  const [brew, setBrew] = React.useState({
    // brewId: props.match.params.brewId,
    date,
    category: '',
    pattern: '',
    processes: [],
  });
  return (
    <BrewContext.Provider value={[brew, setBrew]}>
      {!brew.brewId && <></>}
      {brew.brewId && <></>}
    </BrewContext.Provider>
  );
}
