import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Tools } from '../../../../lib/Collections';


function IconEditor(props){
    const [name, setName] = useState('name')
    
    function handleIconSave (){
        Meteor.call('createIcon', name, err => err ? console.log(err.reason) : 'success')
    }

    return (
        <div className='col m3'>
            <input placeholder="Placeholder" type="text" className="validate" onChange={e => setName(e.target.value)} />
            Icons will be created here, current home page<br />
            <i className='material-icons'>home</i>
            <button onClick={handleIconSave}>Save</button>
            <p>{name}</p>
        </div>
    )
}

export default withTracker(() => {
    Meteor.subscribe('tools')
    return {
        tools: Tools.find().fetch()
    }
})(IconEditor)

