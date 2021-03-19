import React, { useState } from "react"
import { Fragment } from "react"
import { useHistory } from "react-router"



const Dashbiard = () => {
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
            name: 'Opening a 529',
            marker: [true, false, true, true]
        }
    ])

    const bhsInUI = bhs.map((bh) => {
        const markerCircles = bh.marker.map(did => did ? 
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
        )
        switch(bh.name) {
            case 'Opening a 529':
                return <div>Name: {bh.name} and Marker: {markerCircles}</div>
            // case y:
            //   // code block
            //   break;
            default:
                return <div>uncaught exception</div>
        }
    })

    return (
    <div onClick={() => props.history.push('/addBehavior')}>
        Behaviors
        {bhsInUI}
    </div>
    )
}

const Partners = (props) => {
    const [ prtnrs, setPrtnrs ] = useState([
        {
            name: 'Versace West',
            relationship: 'Bestie',
            email: 'versaceversaceversace@bougiemama.com',
            reportFrequency: 'monthly',
            monitoringBehaviors: ['Opening a 529'],
            status: 'confirmed'
        }
    ])
    const prtnsInUI = prtnrs.map((prtnr) => {
        return <div>Name: {prtnr.name } and Relationship: {prtnr.relationship} and Email: {prtnr.email} and 
        Report Freuquency: {prtnr.reportFrequency} and Monitoring These Behaviors: {prtnr.monitoringBehaviors} and 
        Status: {prtnr.status}
        </div>
    })
    return (
    <div onClick={() => props.history.push('/addPartner')}>
        Partners
        {prtnsInUI}
    </div>
    )
}


export default Dashbiard