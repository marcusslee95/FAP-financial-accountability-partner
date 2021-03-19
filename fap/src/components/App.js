import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import AddBehavior from './AddBehavior';
import Dashboard from './Dashboard';
import Welcome from './Welcome';
import AddPartner from './AddPartner';
import Login from './Login';

const ThemeContext = React.createContext();
export { ThemeContext }

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Welcome/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <ThemeContext.Provider value="dark">
                <Route exact path="/dashboard">
                    <Dashboard/>
                </Route>
                <Route exact path="/addBehavior">
                    <AddBehavior/>
                </Route>
                <Route exact path="/addPartner">
                    <AddPartner/>
                </Route>
                </ThemeContext.Provider>
            </Switch>
        </Router>

    )
}

export default App 
