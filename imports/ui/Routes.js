import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Title, List } from './Components/App'

const Routes = () => (
    <Router>
        <div>
            <Route exact  path="/" component={Title} />
            <Route  path="/list" component={List} />
        </div>
    </Router>
)
export default Routes
