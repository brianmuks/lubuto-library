import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import IconEditor from './dashboard/tools/iconEditor'


const Routes = () => (
    <Router>
        <div>
            <Route exact  path="/" component={IconEditor} />
            {/* <Route  path="/lessons" component={} /> */}
        </div>
    </Router>
)
export default Routes
