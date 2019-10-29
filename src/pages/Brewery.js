import React from 'react';
import StartBrew from '../components/StartBrew'
import EditBrew from '../components/EditBrew'
import { BrewProvider } from '../firebase/brew';
import { ActionsProvider } from '../firebase/actions';

export default function Brewery(props) {
  const brewId = props.match.params.brewId;
  return (
    <BrewProvider brewId={brewId}>
      <ActionsProvider>
        {brewId ? 
          <EditBrew />
        : 
          <StartBrew />
        }
      </ActionsProvider>
    </BrewProvider>
  );
}
