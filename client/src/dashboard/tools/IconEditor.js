import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { COL_TOOLS } from '../../../../lib/Collections';
import { cleanData, isIconValid } from '../../utilities/utils'


function IconEditor({tools}){
    const [name, setName] = useState('name')
    const [label, setLabel] = useState('name')
    
    function handleIconSave (){
        if (!COL_TOOLS.findOne({name})) {
            Meteor.call('createIcon', name,label, err => err ? setError(err.reason) : setName(''))
        } else {
            M.toast({ html: 'The specified icon already exists' })
        }
    }

    return (
        <div className='row'>
            <h5 className='center'>Tool Icons </h5>      
          
        <div className='col m12 offset-m2'>
               

                <div className='col m3'>
                    <a href='https://material.io/tools/icons/?style=baseline'>
                        <i className='material-icons'>search</i>
                        Find Icon</a>
                </div>
                    <div className='col m3'>
                    <input placeholder="name" type="text" className="validate" onChange={e => setName(e.target.value.trim())} />

                    </div>
                    <div className='col m3'>
                    <input placeholder="Icon label e.g my big icon" type="text" className="validate" onChange={e => setLabel(e.target.value)} />

            </div>
                        <div className='col m3'>

                    <button className='btn small' onClick={handleIconSave}>Save</button>

</div>


        </div>  
            <br />        
            <br />        
            <br />        
        <br />  
        {/* <h5 className='center'>Available Icons </h5>       */}
            <ul>

                {
                    tools.map(icon => (

                        <div key={icon._id} className='col m1'>
                            <div className='cyan-text col m12'>
                                <code>{icon.name}</code>
                                <i className='material-icons'>{icon.name}</i>
                                </div>

                        </div>

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

