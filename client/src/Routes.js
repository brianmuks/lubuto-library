import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import IconEditor from './dashboard/tools/iconEditor'
import CreateLesson from './dashboard/d-lesson/CreateLesson'

const Routes = () => (
    <Router>
        <div>
            <Route exact  path="/" component={IconEditor} />
            <Route exact  path="/dashboard/create-lesson" component={CreateLesson} />
            {/* <Route  path="/lessons" component={IconEditor} /> */}
        </div>
    </Router>
)

export default Routes
