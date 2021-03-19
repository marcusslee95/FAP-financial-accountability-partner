import React, { useState } from "react"
import { Fragment } from "react"
import { useHistory } from "react-router"



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
    const [ bhs, setBhs ] = useState([
        {
            id: 1,
            name: 'Opening a 529',
            marker: [true, false, true, true]
        }
    ])

    const bhsInUI = bhs.map((bh) => {
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
                    <div key={bh.id}>
                        Name: {bh.name} and Marker: {markerCircles}<button onClick={() => { //if someone clicks delete then delete this behavior
                        const bhsMinusbhToBeDeleted = bhs.filter(behavior => behavior.id !== bh.id) //https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
                        // console.log(bhsMinusbhToBeDeleted) 
                        setBhs(bhsMinusbhToBeDeleted)
                        }}>Delete</button>
                    </div>
                )
            // case y:
            //   // code block
            //   break;
            default:
                return <div>uncaught exception</div>
        }
    })

    return (
    <div>
        Behaviors
        {bhsInUI}
        <button  onClick={() => props.history.push('/addBehavior')}>Add Behavior</button>
    </div>
    )
}

const Partners = (props) => {
    const [ prtnrs, setPrtnrs ] = useState([
        {
            id: 1,
            relationship: 'Bestie',
            email: 'versaceversaceversace@bougiemama.com',
            reportFrequency: 'monthly',
            monitoringBehaviors: ['Opening a 529'],
            status: 'confirmed'
        }
    ])
    const prtnsInUI = prtnrs.map((prtnr) => {
        return (
        <div key={prtnr.id}>
            Name: {prtnr.name } and Relationship: {prtnr.relationship} and Email: {prtnr.email} and 
            Report Freuquency: {prtnr.reportFrequency} and Monitoring These Behaviors: {prtnr.monitoringBehaviors} and 
            Status: {prtnr.status}
            <button onClick={() => {//if someone clicks delete then delete this partner
                const prtnrsMinusPrtnrToBeDeleted = prtnrs.filter(partner => partner.id !== prtnr.id)
                // console.log(prtnrsMinusPrtnrToBeDeleted)
                setPrtnrs(prtnrsMinusPrtnrToBeDeleted)
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


