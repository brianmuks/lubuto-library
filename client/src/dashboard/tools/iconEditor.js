import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Tools } from '../../../../lib/Collections';
import { cleanData, isIconValid } from '../../utilities/utils'


function IconEditor(props){
    const [name, setName] = useState('name')
    const [error, setError ] = useState('')
    
    function handleIconSave (){
        if (isIconValid(cleanData(), name)) {
            Meteor.call('createIcon', name, err => err ? console.log(err.reason) : 'success')
        } else {
            setError('The specified icon is not valid')
        }
    }

    return (
        <div className='col m3'>
            <input placeholder="Placeholder" type="text" className="validate" onChange={e => setName(e.target.value)} />
            Icons will be created here, current home page<br />
            <i className='material-icons'>home</i>
            <button onClick={handleIconSave}>Save</button>
            <p>
            {
                error.length ? error : null
            }
            </p>

        </div>
    )
}

export default withTracker(() => {
    Meteor.subscribe('tools')
    return {
        tools: Tools.find().fetch()
    }
})(IconEditor)

