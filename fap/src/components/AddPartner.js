import React, { useEffect, useState } from 'react';
import { Fragment } from "react"
import { useHistory } from 'react-router';
import axios from 'axios'


const AddPartner = () => {
    const history = useHistory()
    const [ bhs, setBhs ] = useState([]) //array of objects like {type: 'oneOff', bh: {}}

    const [ relationship, setRelationship ] = useState('') 
    const [ email, setEmail ] = useState('') 
    const [ reportFrequency, setReportFrequency ] = useState('') 
    const [ behaviorsPartnerWillMonitor, setBehaviorsPartnerWillMonitor] = useState([]) 

    useEffect(() => { //get bhs because I need to show them as options for user to have this partner monitor 
        // axios.get('http://localhost:4000/testRoute1').then(res => console.log(res))
        axios.get('http://localhost:4000/users/1?behaviors')
            .then(res => {
                const {oneOffBhs, repeatedBhs } = res.data
                console.log(oneOffBhs)
                console.log(repeatedBhs)
                const oneOffBhsWithTypeKey = oneOffBhs.map((oneOffBh) => {
                    return {
                        ...oneOffBh,
                        type: 'oneOff'
                    }
                })
                const repeatedBhsWithTypeKey = repeatedBhs.map((repeatedBh) => {
                    return {
                        ...repeatedBh,
                        type: 'repeated'
                    }
                })
                setBhs([...oneOffBhsWithTypeKey, ...repeatedBhsWithTypeKey])
            })
    }, [] // React compares the current values in 2nd argument and the value on previous render. If they are not the same, effect is invoked. https://dev.to/nibble/what-is-useeffect-hook-and-how-do-you-use-it-1p9c#:~:text=Second%20argument%20to%20useEffect,-The%20second%20argument&text=React%20compares%20the%20current%20value,be%20executed%20after%20every%20render.
    )

    const bhsAsUIElements = bhs.map((bh, index) => {
        return (
            <div className='bhPrtnrCanMonitor' key={bh.id}>
                <input onChange={() => {
                    if ( behaviorsPartnerWillMonitor.find(behaviorAlreadySelected => behaviorAlreadySelected.id === bh.id) ) { //we went from having selected the behavior to deselcting it -> take it off from behaviorsMonitoring
                        const bhsToBeMonitoredBesidesOneThatJustGotDeselcted = behaviorsPartnerWillMonitor.filter(behaviorAlreadySelected => behaviorAlreadySelected.id !== bh.id) //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
                        setBehaviorsPartnerWillMonitor(bhsToBeMonitoredBesidesOneThatJustGotDeselcted)
                    }
                    else { //we just selected this new bh as something partner will monitor
                        const bhsToBeMonitoredAlongWithOneThatJustGotSelected = [...behaviorsPartnerWillMonitor, bh]
                        setBehaviorsPartnerWillMonitor(bhsToBeMonitoredAlongWithOneThatJustGotSelected)
                    }
                }} type='checkbox'/><label> {bh.name}</label>
            </div>
        )
    }) 

    return (
        <Fragment>
            <div>Logo</div>
            <div className='New Partner Input Form' >
                <input value={relationship} onChange={(e) => setRelationship(e.target.value)} placeholder='Relationship'/>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
                <input value={reportFrequency} onChange={(e) => setReportFrequency(e.target.value)} placeholder='Frequency'/><br/>
                {bhsAsUIElements}
                <button onClick={() => {
                    //TODO - send the prtnr to be added back 
                    const newPrtnr = {
                        relationship: relationship,
                        email: email,
                        reportFrequency: reportFrequency,
                        status: "not yet accepted",
                        behaviorsMonitoring: behaviorsPartnerWillMonitor
                    }
                    // const newPrtnr = {
                    //     relationship: "Stranger",
                    //     email: "wallEgf@outerspace.com",
                    //     reportFrequency: "monthly",
                    //     status: "not yet accepted",
                    //     behaviorsMonitoring: [{ "type": "oneOff", "name": "Opening a 529", "id": 22} , { "type": "repeated", "name": "Contributing to 401k", "id": 19}]
                    // }
                    axios.post('http://localhost:4000/users/1/partners', newPrtnr)
                        .then((res) => {
                            const prtnrThatIAdded = res.data
                            console.log(prtnrThatIAdded)
                            history.push('/dashboard')
                        })
                }}>Send Invite</button>
            </div>
        </Fragment>

    )
}

export default AddPartner