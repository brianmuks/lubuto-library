import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Lessons  from './Components/Lessons'
import { Icons } from './Dashboard/createIcons'


const Routes = () => (
    <Router>
        <div>
            <Route exact  path="/" component={Icons} />
            <Route  path="/lessons" component={Lessons} />
        </div>
    </Router>
)
export default Routes
