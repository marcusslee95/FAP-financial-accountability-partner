import React from 'react';
import { Fragment } from "react"
import { useHistory } from 'react-router';



const AddPartner = () => {
    const history = useHistory()
    return (
        <Fragment>
            <div>Logo</div>
            <div onClick={() => history.push('/dashboard')}>Input Form to Fill Out Details About New Partner</div>
        </Fragment>

    )
}

export default AddPartner