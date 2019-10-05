import React from 'react'
import Toast from './Toast'
import { useSelector } from 'react-redux'


export default function Global() {
    const ui = useSelector((state) => state.ui)
    return (
        <div>
            {(ui.errors !== null &&
                <Toast 
                open={true}
                variant="error"
                message={(ui.errors !== null && ui.errors.error.message)}
                />
            )}
        </div>
    )
}
