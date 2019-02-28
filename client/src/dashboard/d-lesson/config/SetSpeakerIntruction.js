import React, { useEffect, useState} from "react";
import { getSound } from "../methods";
import { getUrlParam } from "../../../utilities/Tasks";




function SetSpeakerIntruction({ _setLessonNumber, lessonNumber }){

    const [audioFiles, setAudioFiles] = useState([])


    useEffect(()=>{
        // console.log(src);
        const lang = getUrlParam('lang'); 
        getSound(`audio/${lang}`)
            .then(files => {
                // _dispatch(addAudioFiles(files));
                setAudioFiles(files);
            })
            .catch(err => {
                console.log('error getting audions', err);
            });
    }, [audioFiles])


    const onSoundSet = val =>{
        alert(val)
    }


    return (
        <div className="  speaker-config">
        
            <div className=" col s2">
                <i className="material-icons red-text large right speaker-config-icon"
                >volume_up</i>
       </div>


            <div className="input-field col s6">
                <select defaultValue={''} onChange={val => onSoundSet(val.target.value)} className="browser-default" >
                    <option value={''}  >Sound</option>
                    <RenderAudioOptions audioFiles={audioFiles} />
                </select>
            </div>


                </div>
    )
}



function RenderAudioOptions({ audioFiles }) {
    if (!audioFiles) return null;
    return audioFiles.map((item, index) => (
        <option value={item} key={index}>{item.replace('.wav', '')}</option>
    ))
}

export default SetSpeakerIntruction;