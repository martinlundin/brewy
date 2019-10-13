import React from 'react'
import StartBrew from './../components/StartBrew'
import BrewProcesses from './../components/BrewProcesses'

export const BrewContext = React.createContext();

export default function Brewery(props) {
    // Date as closest hour
    const date = new Date()
    date.setMinutes(date.getMinutes() + 30);
    date.setMinutes(0);
    const [brew, setBrew] = React.useState({
        brewId: props.match.params.brewId,
        date,
        category: '',
        pattern: '',
        processes: [],
    })
    return (
        <BrewContext.Provider value={[brew, setBrew]}>   
            {!brew.brewId && <StartBrew/>}
            {brew.brewId && <BrewProcesses/>}
        </BrewContext.Provider>
    )
}
