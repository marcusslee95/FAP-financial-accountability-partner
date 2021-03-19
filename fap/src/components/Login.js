import React, { Fragment } from 'react'
import { useHistory } from 'react-router'

const Login = () => {
    const history = useHistory()
    return (
        <Fragment>
            <input className='Input for Username' placeholder='Username' />
            <input className='Input for Password' placeholder='Password'/>
            <button className='Login Button' onClick={() => history.push('/dashboard')}>Login</button>
        </Fragment>
    )
}

export default Login