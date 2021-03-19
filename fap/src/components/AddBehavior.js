import React from 'react';
import { Fragment } from "react"
import { useHistory } from 'react-router';



const AddBehavior = () => {
    const history = useHistory()
    return (
        <Fragment>
            <div>Logo</div>
            <div>Potential Behaviors Dropdown</div>
            <div onClick={() => history.push('/dashboard')}>Placeholder for button that appears after user selects something on dropdown</div>
        </Fragment>

    )
}

export default AddBehavior