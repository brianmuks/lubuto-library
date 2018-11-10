import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { COL_TOOLS } from '../../../../lib/Collections';
import { cleanData, isIconValid } from '../../utilities/utils'


function IconEditor({tools}){
    const [name, setName] = useState('name')
    const [label, setLabel] = useState('name')
    const [error, setError ] = useState('')
    
    function handleIconSave (){
        if (isIconValid(cleanData(), name)) {
            Meteor.call('createIcon', name,label, err => err ? setError(err.reason) : setName(''))
        } else {
            setError('The specified icon is not valid')
        }
    }

    return (
        <div className='col m3'>
           <a href='https://material.io/tools/icons/?style=baseline'>
                    <i className='material-icons'>search</i>
                Find Icon</a>
            <input placeholder="name" type="text" className="validate" onChange={e => setName(e.target.value)} />
             
            <input placeholder="Icon label e.g my big icon" type="text" className="validate" onChange={e => setLabel(e.target.value)} />
            Icons will be created here, current home page<br />
            <i className='material-icons'>home</i>
            <button onClick={handleIconSave}>Save</button>
            <p>
            {
                error.length ? error : null
            }
            </p>
            <ul>
                {
                    tools.map(icon => (
                        <i key={icon._id} className='material-icons'>{icon.name}</i>
                    ))
                }
            </ul>

        </div>
    )
}

export default withTracker(() => {
    Meteor.subscribe('tools')
    return {
        tools: COL_TOOLS.find().fetch()
    }
})(IconEditor)

