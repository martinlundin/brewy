import React from 'react';
import StartBrew from '../components/StartBrew'
import EditBrew from '../components/EditBrew'
import { BrewProvider } from '../firebase/brew';

export default function Brewery(props) {
  return (
    <BrewProvider brewId={props.match.params.brewId}>
      {props.match.params.brewId ? 
        <EditBrew />
      : 
        <StartBrew />
      }
    </BrewProvider>
  );
}
