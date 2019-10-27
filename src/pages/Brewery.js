import React from 'react';
import StartBrew from '../components/StartBrew'

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
  return (
    <BrewContext.Provider value={[brew, setBrew]}>
      {props.match.params.brewId ? 
        <div>{props.match.params.brewId}</div>
      : 
        <StartBrew />
      }
    </BrewContext.Provider>
  );
}
