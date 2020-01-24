import React from 'react';
import StartBrew from '../components/StartBrew';
import EditBrew from '../components/EditBrew';
import { BrewProvider } from '../firebase/brew';
import { ActionsProvider } from '../firebase/actions';
import { ActionProvider } from '../firebase/action';

export default function Brewery(props) {
  const { brewId } = props.match.params;
  return (
    <BrewProvider brewId={brewId}>
      <ActionsProvider>
        <ActionProvider>
          {brewId
            ? <EditBrew />
            : <StartBrew />}
        </ActionProvider>
      </ActionsProvider>
    </BrewProvider>
  );
}
