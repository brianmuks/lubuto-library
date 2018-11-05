//NOTE holds all create lesson components

import React from 'react'
import Tools from './Tools'
import MainEditor from './MainEditor'
import StagedTools from './StagedTools'
import ResourceEditor from './ResourceEditor'


function CreateLesson(){

return (
    <section>
    <Tools />

    <div className='row'>
    <MainEditor />
    <StagedTools />
    <ResourceEditor />
    </div>
    </section>
)

}


export default CreateLesson;