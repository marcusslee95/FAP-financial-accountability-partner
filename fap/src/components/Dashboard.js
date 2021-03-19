import React from "react"
import { Fragment } from "react"
import { useHistory } from "react-router"



const Dashbiard = () => {
    const history = useHistory()
    return (
        <Fragment>
            <div>Logo</div>
            <div onClick={() => history.push('/addBehavior')}>Behaviors</div>
            <div onClick={() => history.push('/addPartner')}>Partners</div>
        </Fragment>
    )
}

export default Dashbiard