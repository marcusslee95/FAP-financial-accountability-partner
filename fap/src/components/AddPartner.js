import React from 'react';
import { Fragment } from "react"
import { useHistory } from 'react-router';



const AddPartner = () => {
    const history = useHistory()
    return (
        <Fragment>
            <div>Logo</div>
            <div className='New Partner Input Form' >
                <input placeholder='Name'/>
                <input placeholder='Relationship'/>
                <input placeholder='Email'/>
                <input placeholder='Frequency'/><br/>
                <input type='checkbox'/><label> Placeholder for Behavior that User Is Not Being Held Accountable for 1</label><br/>
                <input type='checkbox'/><label> Placeholder for Behavior that User Is Not Being Held Accountable for 2</label><br/>
                <button onClick={() => history.push('/dashboard')}>Send Invite</button>
            </div>
        </Fragment>

    )
}

export default AddPartner