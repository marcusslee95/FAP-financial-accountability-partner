import React, { useState } from 'react';
import { Fragment } from "react"
import { useHistory } from 'react-router';

const AddBehavior = () => {
    const history = useHistory()

    const [ userHasSelectedSomething, setUserHasSelectedSomething ] = useState(false)
    const [ selectedOption, setSelectedOption ] = useState('')


    let inputOptionsDependingOnSelectedOption; 
    switch (selectedOption){
        case 'Consistent Investing':
            inputOptionsDependingOnSelectedOption = (
                <Fragment>
                    <input placeholder='$ Amount'/>
                    <input placeholder='Frequency'/>
                </Fragment>
            )
            break
        case 'Contributing to 401k':
        inputOptionsDependingOnSelectedOption = (
            <Fragment>
                <input placeholder='$ Amount'/>
                <input placeholder='Frequency'/>
            </Fragment>
        )
            break
        case 'Depositing $ Into Your Account':
        inputOptionsDependingOnSelectedOption = (
            <Fragment>
                <input placeholder='$ Amount'/>
                <input placeholder='Frequency'/>
            </Fragment>
        )
            break
        case 'Opening a 529':
            inputOptionsDependingOnSelectedOption = (
                <Fragment>
                    {/* <input placeholder='Frequency'/> */}
                </Fragment>
            )
                break
        default:
            inputOptionsDependingOnSelectedOption = null
    }

    const stuffToShowConditionally = (
        <div className='Stuff That Shows After User Selects Something' >
            {inputOptionsDependingOnSelectedOption}
            <button onClick={() => history.push('/dashboard')}>Begin Tracking Selected Behavior</button>
        </div>
    )

    return (
        <Fragment>
            <div>Logo</div>
            <div className='Potential Behaviors Dropdown'>
            <label>Start Tracking a Behavior: </label>
            <select name="bhToBeAdded" value={selectedOption}
            onChange={(e) => {
                setUserHasSelectedSomething(true) 
                setSelectedOption(e.target.value)}}
            >
                <option value='Consistent Investing'>Consistent Investing</option>
                <option value='Contributing to 401k'>Contributing to 401k</option>
                <option value='Depositing $ Into Your Account'>Depositing $ Into Your Account</option>
                <option value='Opening a 529'>Opening a 529</option>
            </select>
            </div>
            {userHasSelectedSomething ? stuffToShowConditionally : null }
        </Fragment>
    )
}

export default AddBehavior
