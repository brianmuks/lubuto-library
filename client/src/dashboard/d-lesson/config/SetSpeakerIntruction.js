import React, { useEffect, useState} from "react";
import { getSound, playAudio } from "../methods";
import { getUrlParam } from "../../../utilities/Tasks";
import { setMeta } from "../../d-redux/actions/lessonActions";


function SetSpeakerIntruction({ lessonNumber,dispatch }){
    const [audioFiles, setAudioFiles] = useState([])
    const [audioFile, setAudioFile] = useState(null)
    const lang = getUrlParam('lang'); 

    useEffect(()=>{
       

    }, [audioFiles,lessonNumber])


    const _getSound = e=>{
        (lessonNumber &&
          getSound({ lang, lessonNumber })
            .then(files => {
              // _dispatch(addAudioFiles(files));
              lessonNumber && files.length && setAudioFiles(files);
            })
            .catch(err => {
            })) ||
          M.toast({ html: "Please set Lesson number first" });
    }

    const onSoundSet = val =>{
  
      dispatch(setMeta({audioIntr:val}));
        setAudioFile(val)
    }


    return (
      <div className="speaker-config">
        <div className="row">
          <div onClick={e => playAudio(audioFile)} className=" col s2 ">
            <i className="material-icons red-text pointer large right speaker-config-icon">
              volume_up
            </i>
          </div>

          <div className="input-field col s2">
            <select
              onClick={_getSound}
              defaultValue={""}
              onChange={val => onSoundSet(audioFiles[val.target.value])}
              className="browser-default"
            >
              <option value={""}>Sound</option>
              <RenderAudioOptions audioFiles={audioFiles} />
            </select>
          </div>
        </div>
      </div>
    );
}

function RenderAudioOptions({ audioFiles }) {
 
    if (!audioFiles) return null;
    return audioFiles.map((item, index) => (
        <option value={index} key={index}>{item.name.replace('.wav', '')}</option>
    ))
}

export default SetSpeakerIntruction;