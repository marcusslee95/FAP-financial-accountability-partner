import React, { useState } from 'react';
import { Fragment } from "react"
import { useHistory } from 'react-router';
import axios from 'axios'

const AddBehavior = () => {
    const history = useHistory()

    const [ userHasSelectedSomething, setUserHasSelectedSomething ] = useState(false)
    const [ selectedOption, setSelectedOption ] = useState('')

    const [ frequencyForWhenUserChoosesToAddARepeatedBh, setFrequency ] = useState('')
    const [ amountForWhenUserChoosesToAddARepeatedBh, setAmount ] = useState('')

    const [ userChoosesToAddAOneOffBh, setOneOffBh ] = useState(false)
    const [ userChoosesToAddARepeatedBh, setRepeatedBh ] = useState(false)


    let inputOptionsDependingOnSelectedOption; 
    switch (selectedOption){
        case 'Consistent Investing':
            inputOptionsDependingOnSelectedOption = (
                <Fragment>
                    <input value={amountForWhenUserChoosesToAddARepeatedBh} onChange={(e) => setAmount(e.target.value)} placeholder='$ Amount'/>
                    <input value={frequencyForWhenUserChoosesToAddARepeatedBh} onChange={(e) => setFrequency(e.target.value)} placeholder='Frequency'/>
                </Fragment>
            )
            break
        case 'Contributing to 401k':
        inputOptionsDependingOnSelectedOption = (
            <Fragment>
                <input value={amountForWhenUserChoosesToAddARepeatedBh} onChange={(e) => setAmount(e.target.value)} placeholder='$ Amount'/>
                <input value={frequencyForWhenUserChoosesToAddARepeatedBh} onChange={(e) => setFrequency(e.target.value)} placeholder='Frequency'/>
            </Fragment>
        )
            break
        case 'Depositing $ Into Your Account':
        inputOptionsDependingOnSelectedOption = (
            <Fragment>
                <input value={amountForWhenUserChoosesToAddARepeatedBh} onChange={(e) => setAmount(e.target.value)} placeholder='$ Amount'/>
                <input value={frequencyForWhenUserChoosesToAddARepeatedBh} onChange={(e) => setFrequency(e.target.value)} placeholder='Frequency'/>
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
            <button onClick={ async () => {
                // Sending a post request w/the object containing data of the new behavior we'll create requires...
                //     1st: capturing all the data that object will need (currently have data 1offbh will need but not repeated bh -> update: stored data that repeated bh will need in state... ofc there's argument to be made where in case where choose 1offBh and not repeaetedBh that means we're just keeping two extra state variables that we don't  use.... though i wonder what the alternative is..... having said that shouldn't be too much of a problem given it's only two extra state variables.... if i start letting users track behaviors that have a bajillion details... i'll need to store a bajillion state variables even if i don't choose that bh would be a problem.... but for now i'm good max # details a bh has is 4.... and don't see that changing much. if it did.... then i'd have bigger problems i.e. change to mongo cuz flexible schema instead of SQL strict schema
                //     2nd: knowing whether user chose to add a 1offBh or a repeatedBh -> as that will decide what endpoint we'll hit... either /oneOffBehaviors or /repeatedBehaviors
                if (userChoosesToAddAOneOffBh){
                    const newBH = { name: selectedOption, marker: false }
                    console.log(newBH)
                    await axios.post('http://localhost:4000/users/1/oneOffBehaviors', newBH).then(res => console.log(res.data)) //use await cuz don't want to run code below where go back to dashboard page before adding bh to db finishes
                } 
                else if (userChoosesToAddARepeatedBh) {
                    const newBH = { name: selectedOption, marker: [false], frequency: frequencyForWhenUserChoosesToAddARepeatedBh, amount: amountForWhenUserChoosesToAddARepeatedBh} 
                    console.log(newBH)
                    await axios.post('http://localhost:4000/users/1/repeatedBehaviors', newBH).then(res => console.log(res.data)) 
                }
                history.push('/dashboard')
            }}>Begin Tracking Selected Behavior</button>
        </div>
    )

    return (
        <Fragment>
            <div>Logo</div>
            <div className='Potential Behaviors Dropdown'>
            <label>Start Tracking a Behavior: </label>
            <select name="bhToBeAdded" value={selectedOption}
            onChange={(e) => {
                // console.log(e)
                setUserHasSelectedSomething(true) 
                setSelectedOption(e.target.value)
                if(e.target.value === 'Opening a 529'){ //determining if user selected 1OffBh or repeatedBh -> would be nice if i could add some attribute to the option elements i.e. bhtype = 'repeatedBh' looks like I could do that but it's too much trouble tryinng to find value of bhtype
                    setOneOffBh(true)
                    setRepeatedBh(false)
                }
                else{
                    setRepeatedBh(true)
                    setOneOffBh(false)
                }
            }
            }
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
