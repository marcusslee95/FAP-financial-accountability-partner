import React, { useState, useEffect } from "react"
import { Fragment } from "react"
import { useHistory } from "react-router"
import axios from 'axios'


const Dashboard = () => {
    const history = useHistory()
    const [ causeStateInPrtnrsComponentWithARerender, setChangeStateInPrtnrsComponent ] = useState(false)

    return (
        <Fragment>
            <div>Logo</div>
            <Behaviors history={history} 
            tellPartnersComponentGetPrtnrsAgain={setChangeStateInPrtnrsComponent} conditionalValue={causeStateInPrtnrsComponentWithARerender}/>
            <Partners history={history} 
            indicatorThatIShouldGetPrtnrsAgain={causeStateInPrtnrsComponentWithARerender} tellMyselfToGetPrtnrsAgain={setChangeStateInPrtnrsComponent}/>
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
    const [ indicatorThatIShouldGetBhsAgain, tellMyselfToGetBhsAgain ] = useState(false)

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
    }, [indicatorThatIShouldGetBhsAgain] // React compares the current values in 2nd argument and the value on previous render. If they are not the same, effect is invoked. https://dev.to/nibble/what-is-useeffect-hook-and-how-do-you-use-it-1p9c#:~:text=Second%20argument%20to%20useEffect,-The%20second%20argument&text=React%20compares%20the%20current%20value,be%20executed%20after%20every%20render.
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
                        axios.delete(`http://localhost:4000/users/1/oneOffBehaviors/${bh.id}`)
                        .then((res) => {//after we deleted the partner from the db.... we can just update state directly because.. - so long as we're sure the deletion was successful on db - it's wasteful to get all the partners again from db.... just subtract the deletedPartner from the state
                            tellMyselfToGetBhsAgain(!indicatorThatIShouldGetBhsAgain)

                            // //B4: leveraged 2nd argument in use effect to execute bhs fetching code when we want to 
                            // const deletedBh = res.data
                            // console.log(deletedBh)
        
                            // const OneOffBhsMinusOneOffBhToBeDeleted = oneOffBehaviors.filter(oneOffBh => oneOffBh.id !== deletedBh.id)
                            // // console.log(OneOffBhsMinusOneOffBhToBeDeleted)
                            // setOneOffBhs(OneOffBhsMinusOneOffBhToBeDeleted)
                            // //AFTER: leveraged 2nd argument in use effect to execute bhs fetching code when we want to 

                            //cause partners component to fetch partners again because there might be potentially fewer partners since we deleted them from db if no longer monitoring bhs
                            props.tellPartnersComponentGetPrtnrsAgain(!props.conditionalValue)
                        })
                        }}>Delete</button>
                    </div>
                )
            case 'Do Your Taxes':
                return (
                    <div key={bh.id}>
                        Name: {bh.name} and Marker: {markerCircle}<button onClick={() => { //if someone clicks delete then delete this behavior
                        axios.delete(`http://localhost:4000/users/1/oneOffBehaviors/${bh.id}`)
                        .then((res) => {
                            tellMyselfToGetBhsAgain(!indicatorThatIShouldGetBhsAgain)

                            props.tellPartnersComponentGetPrtnrsAgain(!props.conditionalValue)
                        })
                        }}>Delete</button>
                    </div>
                )
            case 'Opening a 529':
                return (
                    <div key={bh.id}>
                        Name: {bh.name} and Marker: {markerCircle}<button onClick={() => { //if someone clicks delete then delete this behavior
                        axios.delete(`http://localhost:4000/users/1/oneOffBehaviors/${bh.id}`)
                        .then((res) => {
                            tellMyselfToGetBhsAgain(!indicatorThatIShouldGetBhsAgain)

                            props.tellPartnersComponentGetPrtnrsAgain(!props.conditionalValue)
                        })
                        }}>Delete</button>
                    </div>
                )
            // case y:
            //   // code block
            //   break;
            default:
                return <div key={bh.id}>uncaught exception</div>
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
            case 'Consistent Investing':
                return (
                    <div key={bh.id}>
                        Name: {bh.name} and Marker: {markerCircles}<button onClick={() => { //if someone clicks delete then delete this behavior
                            axios.delete(`http://localhost:4000/users/1/repeatedBehaviors/${bh.id}`)
                            .then((res) => {
                                tellMyselfToGetBhsAgain(!indicatorThatIShouldGetBhsAgain)
    
                                props.tellPartnersComponentGetPrtnrsAgain(!props.conditionalValue)
                            })
                        }}>Delete</button>
                    </div>
                )
            case 'Contributing to 401k':
                return (
                    <div key={bh.id}>
                        Name: {bh.name} and Marker: {markerCircles}<button onClick={() => { //if someone clicks delete then delete this behavior
                            axios.delete(`http://localhost:4000/users/1/repeatedBehaviors/${bh.id}`)
                            .then((res) => {
                                tellMyselfToGetBhsAgain(!indicatorThatIShouldGetBhsAgain)
    
                                props.tellPartnersComponentGetPrtnrsAgain(!props.conditionalValue)
                            })
                        }}>Delete</button>
                    </div>
                )
            case 'Depositing $ Into Your Account':
                return (
                    <div key={bh.id}>
                        Name: {bh.name} and Marker: {markerCircles}<button onClick={() => { //if someone clicks delete then delete this behavior
                            axios.delete(`http://localhost:4000/users/1/repeatedBehaviors/${bh.id}`)
                            .then((res) => {
                                tellMyselfToGetBhsAgain(!indicatorThatIShouldGetBhsAgain)
    
                                props.tellPartnersComponentGetPrtnrsAgain(!props.conditionalValue)
                            })
                        }}>Delete</button>
                    </div>
                )
            case 'send money to grandma':
                return (
                    <div key={bh.id}>
                        Name: {bh.name} and Amount: {bh.amount} and Frequency: {bh.frequency} Marker: {markerCircles}<button onClick={() => { //if someone clicks delete then delete this behavior
                            axios.delete(`http://localhost:4000/users/1/repeatedBehaviors/${bh.id}`)
                            .then((res) => {
                                tellMyselfToGetBhsAgain(!indicatorThatIShouldGetBhsAgain)
    
                                props.tellPartnersComponentGetPrtnrsAgain(!props.conditionalValue)
                            })
                        }}>Delete</button>
                    </div>
                )
            case 'send money to parents':
                return (
                    <div key={bh.id}>
                        Name: {bh.name} and Amount: {bh.amount} and Frequency: {bh.frequency} Marker: {markerCircles}<button onClick={() => { //if someone clicks delete then delete this behavior
                            axios.delete(`http://localhost:4000/users/1/repeatedBehaviors/${bh.id}`)
                            .then((res) => {
                                tellMyselfToGetBhsAgain(!indicatorThatIShouldGetBhsAgain)
    
                                props.tellPartnersComponentGetPrtnrsAgain(!props.conditionalValue)
                            })
                        }}>Delete</button>
                    </div>
                )
            // case y:
            //   // code block
            //   break;
            default:
                return <div key={bh.id}>uncaught exception</div>
        }
    })

    return (
    <div>
        {/* <div onClick={() => props.tellPartnersComponentGetPrtnrsAgain(props.conditionalValue + '1')}>TEST</div> */}
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
    }, [props.indicatorThatIShouldGetPrtnrsAgain] // React compares the current values in 2nd argument and the value on previous render. If they are not the same, effect is invoked. https://dev.to/nibble/what-is-useeffect-hook-and-how-do-you-use-it-1p9c#:~:text=Second%20argument%20to%20useEffect,-The%20second%20argument&text=React%20compares%20the%20current%20value,be%20executed%20after%20every%20render.
    )

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
                .then((res) => {//after we deleted the partner from the db.... get the partners again to get new list of partners besides the one we just deleted
                    props.tellMyselfToGetPrtnrsAgain(!props.indicatorThatIShouldGetPrtnrsAgain)

                    //B4: figured out how to useEffect properly to get partners when I made some change to the partners - ie added or deleted a partner
                    // const deletedPrtnr = res.data
                    // console.log(deletedPrtnr)

                    // const prtnrsMinusPrtnrToBeDeleted = prtnrs.filter(partner => partner.partnerId !== deletedPrtnr.id)
                    // // console.log(prtnrsMinusPrtnrToBeDeleted)
                    // setPrtnrs(prtnrsMinusPrtnrToBeDeleted)
                    //AFTER: figured out how to useEffect properly to get partners when I made some change to the partners - ie added or deleted a partner

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


