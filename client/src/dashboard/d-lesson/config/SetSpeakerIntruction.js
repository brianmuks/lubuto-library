import React, { useEffect, useState} from "react";
import { getSound, playAudio } from "../methods";
import { getUrlParam } from "../../../utilities/Tasks";
import { setMeta } from "../../d-redux/actions/lessonActions";


function SetSpeakerIntruction({ dispatch }){
    const [audioFiles, setAudioFiles] = useState([])
    const [audioFile, setAudioFile] = useState(null)

    useEffect(()=>{
        // console.log(src);
        const lang = getUrlParam('lang'); 
        getSound(`audio/${lang}/key`)
            .then(files => {
                // _dispatch(addAudioFiles(files));
                setAudioFiles(files);
            })
            .catch(err => {
                console.log('error getting audions', err);
            });
    }, [audioFiles])

    const onSoundSet = val =>{
  
      dispatch(setMeta({audioIntr:val}));
        setAudioFile(val)
    }


    return (
        <div className="  speaker-config">
        
            <div className=" col s2 pointer">
                <i onClick={e=>playAudio('key/'+audioFile)} className="material-icons red-text large right speaker-config-icon"
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