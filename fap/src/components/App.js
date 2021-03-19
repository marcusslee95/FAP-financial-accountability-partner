import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import AddBehavior from './AddBehavior';
import Dashbiard from './Dashboard';
import Welcome from './Welcome';
import AddPartner from './AddPartner';


const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Welcome/>
                </Route>
                <Route exact path="/dashboard">
                    <Dashbiard/>
                </Route>
                <Route exact path="/addBehavior">
                    <AddBehavior/>
                </Route>
                <Route exact path="/addPartner">
                    <AddPartner/>
                </Route>
            </Switch>
        </Router>

    )
}

export default App 
