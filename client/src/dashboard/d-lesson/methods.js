import { getUrlParam } from "../../utilities/Tasks";
import { TOOL_CONFIG_MODAL_ID } from "./config/ToolConfig";
import { AUDIO_URL } from "../../utilities/constants";
import { COL_Lessons } from "../../../../lib/Collections";

export const saveLesson = (lesson,meta) => {

    const lang = getUrlParam('lang');
    const type = getUrlParam('type');
    meta = {...meta,lang,type};
    lesson = { content:{...lesson},meta};

    const query = { 'meta.lang': lang, 'meta.lessonNumber': meta.lessonNumber,
                   'meta.lessonPageNumber': meta.lessonPageNumber}

    if (!meta.lessonNumber) {
        M.toast({ html: 'Please set the lesson Number' });
        $(`#${TOOL_CONFIG_MODAL_ID}-trigger`)[0].click();
        return
    } else if (!meta.lessonPageNumber) {
        M.toast({ html: 'Please set the lesson Page Number' });
        $(`#${TOOL_CONFIG_MODAL_ID}-trigger`)[0].click();
        return
    } else if (COL_Lessons.findOne(query)){
        M.toast({ html: `Sorry Lesson page number ${meta.lessonPageNumber} is already taken` });
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

 
    lesson = { lessonId, content: { ...lesson }, meta };

    const query = {
        'meta.lang': meta.lang, 'meta.lessonNumber': meta.lessonNumber,
        'meta.lessonPageNumber': meta.lessonPageNumber
    }

    if (!meta.lessonNumber) {
        M.toast({ html: 'Please set the lesson Number' });
        $(`#${TOOL_CONFIG_MODAL_ID}-trigger`)[0].click();
        return
    } else if (!meta.lessonPageNumber) {
        M.toast({ html: 'Please set the lesson Page Number' });
        $(`#${TOOL_CONFIG_MODAL_ID}-trigger`)[0].click();
        return
    } 
    
    const _lesson = COL_Lessons.findOne(query,{fields:{_id:1}});


    if (_lesson && _lesson._id !== lessonId) {
        M.toast({ html: `Sorry Lesson page number ${meta.lessonPageNumber} is already taken` });
        $(`#${TOOL_CONFIG_MODAL_ID}-trigger`)[0].click();
        return
    }

  
    Meteor.call('editLesson', lesson, (err, ok) => {
        console.log(err, ok);
        err && M.toast({ html: 'Sorry error occured' }) || M.toast({ html: 'Lesson Updated!' });
    })
}


export const deleteLesson = _id => {
    Meteor.call('deleteLesson', _id, (err, ok) => {
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