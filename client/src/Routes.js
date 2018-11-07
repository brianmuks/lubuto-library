import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import IconEditor from './dashboard/tools/iconEditor'
import CreateLesson from './dashboard/d-lesson/CreateLesson'
import Landing from './common/components/Landing'

const Routes = () => (
    <Router>
        <div>
            <Route exact  path="/" component={Landing} />
            <Route exact  path="/add_icons" component={IconEditor} />
            <Route exact  path="/dashboard/create-lesson" component={CreateLesson} />
        </div>
    </Router>
)

export default Routes
