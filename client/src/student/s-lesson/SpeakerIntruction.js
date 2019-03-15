import React, { useEffect, useState } from "react";
import { playAudio } from "../../dashboard/d-lesson/methods";
function SpeakerIntruction({ dispatch, lesson }) {




    return (
        <div   className="s-speaker-container">
            <div className=" col s12 offset-m1 pointer s-speaker ">
                <i 
                // onClick={()=>alert()}
                onClick={e => playAudio('key/' + lesson && lesson.meta.audioIntr)}
                 className="material-icons red-text large right speaker-config-icon"
                >volume_up</i>
            </div>
        </div>
    )
}



export default SpeakerIntruction;