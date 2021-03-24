import React, { useState, useEffect } from "react"
import { Fragment } from "react"
import { useHistory } from "react-router"
import axios from 'axios'


const Dashboard = () => {
    const history = useHistory()
    return (
        <Fragment>
            <div>Logo</div>
            <Behaviors history={history}/>
            <Partners history={history}/>
        </Fragment>
    )
}

const Behaviors = (props) => {
    // const [ bhs, setBhs ] = useState([
    //     {
    //         id: 1,
    //         name: 'Opening a 529',
    //         marker: [true, false, true, true]
    //     }
    // ])
    const [ oneOffBehaviors, setOneOffBhs ] = useState([])
    const [ repeatedBehaviors, setRepeatedBhs ] = useState([])

    useEffect(() => { // executes code inside after component renders - https://reactjs.org/docs/hooks-effect.html
        // axios.get('http://localhost:4000/testRoute1').then(res => console.log(res))
        axios.get('http://localhost:4000/users/1?behaviors')
            .then(res => {
                const {oneOffBhs, repeatedBhs } = res.data
                console.log(oneOffBhs)
                console.log(repeatedBhs)
                // setBhs([...oneOffBhs, ...repeatedBhs])
                setOneOffBhs([...oneOffBhs])
                setRepeatedBhs([...repeatedBhs])
            })
    }, [] // empty array is to have it not do it's default behavior of running the code everytime we render - cuz in that case it would be componentdidupate - and if we update state we'll be rerendering the component which would cause code to execute causing another state change and rerender... infinite... - https://stackoverflow.com/questions/56249151/react-useeffect-hook-componentdidmount-to-useeffect
    )

    const oneOffBhsInUI = oneOffBehaviors.map((bh) => {
        const markerCircle = bh.marker ? 
            <span style={{
                height: '10px',
                width: '10px',
                backgroundColor: 'greenyellow',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '5px',
                borderWidth: '1px',
                borderStyle: 'solid'
            }}></span> : 
            <span style={{
                height: '10px',
                width: '10px',
                backgroundColor: 'red',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '5px',
                borderWidth: '1px',
                borderStyle: 'solid'
            }}></span> 

        switch(bh.name) {
            case 'Open a High-Yield Savings Account':
                return (
                    <div key={bh.id}>
                        Name: {bh.name} and Marker: {markerCircle}<button onClick={() => { //if someone clicks delete then delete this behavior
                        const bhsMinusbhToBeDeleted = oneOffBehaviors.filter(behavior => behavior.name !== bh.name) //https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
                        // console.log(bhsMinusbhToBeDeleted) 
                        setOneOffBhs(bhsMinusbhToBeDeleted)
                        }}>Delete</button>
                    </div>
                )
            case 'Do Your Taxes':
                return (
                    <div key={bh.id}>
                        Name: {bh.name} and Marker: {markerCircle}<button onClick={() => { //if someone clicks delete then delete this behavior
                        const bhsMinusbhToBeDeleted = oneOffBehaviors.filter(behavior => behavior.name !== bh.name) //https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
                        // console.log(bhsMinusbhToBeDeleted) 
                        setOneOffBhs(bhsMinusbhToBeDeleted)
                        }}>Delete</button>
                    </div>
                )
            // case y:
            //   // code block
            //   break;
            default:
                return <div key={bh.name}>uncaught exception</div>
        }
    })

    const repeatedBhsInUI = repeatedBehaviors.map((bh) => {
        const markerCircles = bh.marker.map((did, circleIndex) => did ? // https://www.w3schools.com/howto/howto_css_circles.asp
            <span key={circleIndex} style={{
                height: '10px',
                width: '10px',
                backgroundColor: 'greenyellow',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '5px',
                borderWidth: '1px',
                borderStyle: 'solid'
            }}></span> : 
            <span key={circleIndex} style={{
                height: '10px',
                width: '10px',
                backgroundColor: 'red',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '5px',
                borderWidth: '1px',
                borderStyle: 'solid'
            }}></span> 
        )
        switch(bh.name) {
            case 'Opening a 529':
                return (
                    <div key={bh.name}>
                        Name: {bh.name} and Marker: {markerCircles}<button onClick={() => { //if someone clicks delete then delete this behavior
                        const bhsMinusbhToBeDeleted = repeatedBehaviors.filter(behavior => behavior.name !== bh.name) 
                        // console.log(bhsMinusbhToBeDeleted) 
                        setRepeatedBhs(bhsMinusbhToBeDeleted)
                        }}>Delete</button>
                    </div>
                )
            case 'send money to grandma':
                return (
                    <div key={bh.name}>
                        Name: {bh.name} and Amount: {bh.amount} and Frequency: {bh.frequency} Marker: {markerCircles}<button onClick={() => { //if someone clicks delete then delete this behavior
                        const bhsMinusbhToBeDeleted = repeatedBehaviors.filter(behavior => behavior.name !== bh.name) 
                        // console.log(bhsMinusbhToBeDeleted) 
                        setRepeatedBhs(bhsMinusbhToBeDeleted)
                        }}>Delete</button>
                    </div>
                )
            case 'send money to parents':
                return (
                    <div key={bh.name}>
                        Name: {bh.name} and Amount: {bh.amount} and Frequency: {bh.frequency} Marker: {markerCircles}<button onClick={() => { //if someone clicks delete then delete this behavior
                        const bhsMinusbhToBeDeleted = repeatedBehaviors.filter(behavior => behavior.name !== bh.name) 
                        // console.log(bhsMinusbhToBeDeleted) 
                        setRepeatedBhs(bhsMinusbhToBeDeleted)
                        }}>Delete</button>
                    </div>
                )
            // case y:
            //   // code block
            //   break;
            default:
                return <div key={bh.name}>uncaught exception</div>
        }
    })

    return (
    <div>
        Behaviors
        {oneOffBhsInUI}
        {repeatedBhsInUI}
        <button  onClick={() => props.history.push('/addBehavior')}>Add Behavior</button>
    </div>
    )
}

const Partners = (props) => {
    const [ prtnrs, setPrtnrs ] = useState([])
    useEffect(() => { 
        axios.get('http://localhost:4000/users/1?partners')
            .then(res => {
                const {prtnrsWhoMonitorOneOffBhs, prtnrsWhoMonitorRepeatedBhs } = res.data
                console.log(prtnrsWhoMonitorOneOffBhs)
                console.log(prtnrsWhoMonitorRepeatedBhs)
                setPrtnrs([...prtnrsWhoMonitorOneOffBhs, ...prtnrsWhoMonitorRepeatedBhs])
            })
    }, [] )

    const prtnsInUI = prtnrs.map((prtnr) => {
        return (
        <div key={prtnr.relationship}>
            Relationship: {prtnr.relationship} and Email: {prtnr.email} and 
            Report Frequency: {prtnr.reportFrequency} and Monitoring These Behaviors: {prtnr.name} and 
            Status: {prtnr.status}
            <button onClick={() => {//if someone clicks delete.... then delete this partner
                //delete them from the db
                // axios.get(`http://localhost:4000/partners/${prtnr.partnerId}`)
                axios.delete(`http://localhost:4000/users/1/partners/${prtnr.partnerId}`)
                .then((res) => {//after we deleted the partner from the db.... we can just update state directly because.. - so long as we're sure the deletion was successful on db - it's wasteful to get all the partners again from db.... just subtract the deletedPartner from the state
                    const deletedPrtnr = res.data
                    console.log(deletedPrtnr)

                    const prtnrsMinusPrtnrToBeDeleted = prtnrs.filter(partner => partner.partnerId !== deletedPrtnr.id)
                    // console.log(prtnrsMinusPrtnrToBeDeleted)
                    setPrtnrs(prtnrsMinusPrtnrToBeDeleted)
                })
            }}>Delete</button>
        </div>
        )
    })
    return (
    <div >
        Partners
        {prtnsInUI}
        <button onClick={() => props.history.push('/addPartner')}>Add Partner</button>
    </div>
    )
}


export default Dashboard


