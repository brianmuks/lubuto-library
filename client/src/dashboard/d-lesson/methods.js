import { getUrlParam } from "../../utilities/Tasks";
import { TOOL_CONFIG_MODAL_ID } from "./config/ToolConfig";
import { AUDIO_URL } from "../../utilities/constants";

export const saveLesson = (lesson,meta) => {

    const lan = getUrlParam('lang');
    const type = getUrlParam('type');
    meta = {...meta,lan,type};
    lesson  = {...lesson,meta};

    if (!meta.lessonNumber) {
        M.toast({ html: 'Please set the lesson Number' });
        $(`#${TOOL_CONFIG_MODAL_ID}-trigger`)[0].click();
        return
    }

    return new Promise ((resolve,reject)=>{
        Meteor.call('saveLesson', lesson, (err, _id) => {
            console.log(err, _id);
            if (err) {
                alert('Sorry error occured');
                // M.toast()
            }else{
                alert('Lesson saved!')
                resolve(_id);
            }
        })

    })

}


export const editLesson =( {lessonId,lesson,meta}) => {
  
    Meteor.call('editLesson',{...lesson,_id:lessonId}, (err, ok) => {
        console.log(err, ok);
        err && alert('Sorry error occured') || alert('Lesson Updated!')
    })
}

export const getSound = src => {

    return new Promise((resolve, reject) => {
        Meteor.call('Tool.getSound', src, (err, ok) => {

            // console.log(err, ok);
            if (err) {
                reject(err)
            }else{
                resolve(ok);
            }

        })
    });
}


export const getImages = src => {

    return new Promise((resolve, reject) => {
        Meteor.call('Tool.getSound', src, (err, ok) => {
            // console.log(err, ok);
            if (err) {
                reject(err)
            } else {
                resolve(ok);
            }
        })
    });

}


export const playAudio = audioFile =>{

    if (!audioFile) {
        return
    }
    const lang = getUrlParam('lang');
    var audio = document.getElementById("audio");
    const src = AUDIO_URL + lang + '/' + audioFile;
    audio.src = src;
    audio.play();
}

export const getResourceEditorStyles = ()=>(
    [
        { name: 'color', label: 'Color' },
         { label: 'Background Color', name: 'background-color' }
        , { name: 'padding', label: 'Padding' }, 
        { name: 'fontSize', label: 'Size' }, 
        { name: 'border-radius', label: 'Border' }
        , { name: 'width', label: 'Container Width' }, 
        { name: 'height', label: 'Container Height' },
        { name: 'width', label: 'Width' }, 
        { name: 'height', label: 'Height' }
    ]
)