import { getUrlParam, generateFileUrl } from "../../utilities/Tasks";
import { TOOL_CONFIG_MODAL_ID } from "./config/ToolConfig";
import { AUDIO_URL } from "../../utilities/constants";
import { COL_Lessons } from "../../../../lib/Collections";
import { EDIT_STAGGED_TOOL, UNDO_COUNTER } from "../d-redux/constants";
import { editStaggedTools } from "../d-redux/actions/lessonActions";

export const unDo = ({ e, dispatch }) => {
    var evtobj = window.event ? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
        let tools = JSON.parse(sessionStorage.getItem(EDIT_STAGGED_TOOL));
        tools = Array.from(tools);

        if (tools.length === 0) {
            return;//no undo
        }
        let data = tools;

        tools = tools[0];
        tools && dispatch(editStaggedTools(tools));
        //sessionStorage.setItem(UNDO_COUNTER, JSON.stringify(undoCounter+1));
        data.shift();
        sessionStorage.setItem(EDIT_STAGGED_TOOL, JSON.stringify(data));
    }

}



export const saveLesson = (lesson, meta) => {
    return new Promise((resolve, reject) => {

        const lang = getUrlParam('lang');
        const type = getUrlParam('type');
        meta = { ...meta, lang, type };
        lesson = { content: { ...lesson }, meta };

        const query = {
            'meta.lang': lang, 'meta.lessonNumber': meta.lessonNumber,
            'meta.lessonPageNumber': meta.lessonPageNumber
        }

        const query2 = {
            'meta.lang': meta.lang, 'meta.lessonNumber': meta.lessonNumber,
            'meta.lessonPageNumber': 1
        }

        if (!meta.lessonNumber) {
            M.toast({ html: 'Please set the lesson Number' });
            $(`#${TOOL_CONFIG_MODAL_ID}-trigger`)[0].click();
            reject()
            return
        } else if (!meta.lessonPageNumber) {
            M.toast({ html: 'Please set the lesson Page Number' });
            $(`#${TOOL_CONFIG_MODAL_ID}-trigger`)[0].click();
            reject()
            return
        } else if (COL_Lessons.findOne(query)) {
            M.toast({ html: `Sorry Lesson page number ${meta.lessonPageNumber} is already taken` });
            $(`#${TOOL_CONFIG_MODAL_ID}-trigger`)[0].click();
            reject()

            return
        }
        const _lesson2 = COL_Lessons.findOne(query2, { fields: { _id: 1 } });

        /**
         * if page 1 is missing no lessons will be visible to the student and
         * admin
         */
        if (!_lesson2 && meta.lessonPageNumber !== 1) {
            M.toast({ html: `Please set this lesson page number to '1'` });
            $(`#${TOOL_CONFIG_MODAL_ID}-trigger`)[0].click();
            reject()

            return
        }


        Meteor.call('saveLesson', lesson, (err, _id) => {
            console.log(err, _id);
            if (err) {
                M.toast({ html: 'Sorry error occured' });
                reject()
                // M.toast()
            } else {
                M.toast({ html: 'Lesson saved!' })
                resolve(_id);
            }
        })
    })
}


export const editLesson = ({ lessonId, lesson, meta }) => {


    lesson = { lessonId, content: { ...lesson }, meta };

    const query = {
        'meta.lang': meta.lang, 'meta.lessonNumber': meta.lessonNumber,
        'meta.lessonPageNumber': meta.lessonPageNumber
    }
    const query2 = {
        'meta.lang': meta.lang, 'meta.lessonNumber': meta.lessonNumber,
        'meta.lessonPageNumber': 1
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

    const _lesson = COL_Lessons.findOne(query, { fields: { _id: 1 } });
    const _lesson2 = COL_Lessons.findOne(query2, { fields: { _id: 1 } });


    if (_lesson && _lesson._id !== lessonId) {
        M.toast({ html: `Sorry Lesson page number ${meta.lessonPageNumber} is already taken` });
        $(`#${TOOL_CONFIG_MODAL_ID}-trigger`)[0].click();
        return
    } else if (_lesson2 && _lesson2._id == lessonId && meta.lessonPageNumber !== 1) {
        M.toast({ html: `Sorry you can't change the lesson page number if it's '1'` });
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
        err && alert('Sorry error occured') || M.toast({ html: 'Lesson deleted' })
    })
}

export const getSound = ({ lang, lessonNumber }) => {
    return new Promise((resolve, reject) => {
        Meteor.call(
            "Tool.getSound",
            { lang, lessonNumber },
            (err, files) => {
                // console.log(err, ok);
                if (err) {
                    reject(err);
                } else if (!files) {
                    const msg = `Sorry no audio found for language=${getUrlParam(
                        "lang"
                    )}`;
                    M.toast({ html: msg });
                } else {
                    console.log(files, "files");
                    resolve(files);
                }
            }
        );
    });
};


export const getImages = () => {
    return new Promise((resolve, reject) => {
        Meteor.call("Tool.getImages", (err, ok) => {
            // console.log(err, ok);
            if (err) {
                reject(err);
            } else {
                resolve(ok);
            }
        });
    });

}


export const copyLesson = ({ lessonNumber, lang, newLangs }) => {
    return new Promise((resolve, reject) => {
        Meteor.call('Lesson.copyLesson', { lessonNumber, lang, newLangs }, (err, ok) => {
            // console.log(err, ok);
            if (err) {
                const msg = `Sorry an error occured`
                M.toast({ html: msg })
                reject(err)
            } else {
                const msg = `Done`
                M.toast({ html: msg })
                resolve(ok);
            }
        })
    });
}

export const copPage = ({ lessonNumber, lessonPageNumber, lang, newLangs }) => {
    return new Promise((resolve, reject) => {
        Meteor.call('Lesson.copyPage', { lessonNumber, lessonPageNumber, lang, newLangs }, (err, ok) => {
            // console.log(err, ok);
            if (err) {
                const msg = `Sorry an error occured`
                M.toast({ html: msg })
                reject(err)
            } else {
                const msg = `Done`
                M.toast({ html: msg })
                resolve(ok);
            }
        })
    });
}



export const playAudio = async audioFile => {
    console.log(audioFile, "audioFile");

    if (!audioFile) {
        return
    }


    var audio = document.getElementById("audio");
    audio.src = generateFileUrl({ file: audioFile });
    await audio.play();
}

export const getResourceEditorStyles = () => (
    [
        { name: 'color', label: 'Color' },
        { label: 'Background Color', name: 'background-color' }
        , { name: 'padding', label: 'Padding' },
        { name: 'fontSize', label: 'Size' },
        { name: 'border-radius', label: 'Border' }
        , { name: 'width', label: 'Container Width' },
        { name: 'height', label: 'Container Height' },
        { name: 'width', label: 'Width' },
        { name: 'height', label: 'Height' },
        { name: 'border-radius', label: 'Radius' }
    ]
)