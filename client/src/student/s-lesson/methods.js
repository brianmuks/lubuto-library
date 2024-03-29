const LANG = 'kao';   //TODO: get from URL
import { AUDIO_URL, IMAGE_EXTERNAL_URL, NO_SOUND, YES_SOUND } from "../../utilities/constants";
import { recordAttempt } from "../s-statistics/methods";
import { generateFileUrl } from "../../utilities/Tasks";

export const getSound = src => {
    return new Promise((resolve, reject) => {
        Meteor.call('Tool.getSound', src, (err, ok) => {

            if (err) {
                reject(err)
            } else {
                resolve(ok);
            }

        })
    });


}


export const checkAns = (ans, question) => {
    const ansIndex = ans.index;// is Int
    const questionIndex = question.index;//is Int
    const rightAnsIndexs = question.rightAnsIndexs;//is Array
    const isCorrect = rightAnsIndexs.toString().indexOf(ansIndex);
    // console.log('checkAns', ansIndex, rightAnsIndexs  );
    return isCorrect === 0 && true || false;
}

export const playAudio = async audioFile => {
    if (!audioFile) {
        return
    }
    var audio = document.getElementById("audio");
    // const src = AUDIO_URL + LANG + '/' + audioFile;
   const src =  generateFileUrl({ file: audioFile });

    if (src.indexOf('undefined') == -1){
            audio.src = src;
            await audio.play();
    } 

}

export const onDrop = (ev, ans, draggedQuestion, lessonId) => {
    ev.preventDefault();
    const isCorrect = checkAns(ans, draggedQuestion);
    // console.log('isCorrect', isCorrect);
    const questionIndex = draggedQuestion.index;


    if (!isCorrect) {
        playAudio(NO_SOUND);
        //{ MinimongoError: Key question.[object Object] must not contain '.'
        recordAttempt({ questionIndex, lessonId, passed: false });
 onAfterDrop({ isAdd: false });

        // TODO:placyAudio  
        return;
    }
    recordAttempt({ questionIndex, lessonId, passed: true });

    playAudio(YES_SOUND);
    const width = ans.style.width || '100';
    let left = parseInt(width.replace('px', ''));
    diff = 15 / 100 * left;

    left = left / 2 - diff;
    const data = ev.dataTransfer.getData("text");
    let draggedItem = document.getElementById(data);

    const childElem = draggedItem.children[0].children[0].children[0];

    draggedItem.style = `bottom:30px;position:relative;`;
    childElem.style = `padding:0px ; 
    position:relative;
    color:black;
    margin: 0 auto`;

    if (draggedQuestion.type == 'text') {
        // draggedItem = `<code>${draggedItem}</code>`
    }
    //  ev.target.style['font-size'] = '0px';
    ev.target.appendChild(draggedItem);

 onAfterDrop({isAdd:false});


     

    // console.log('ondrop', );
}


//TODO: move all to methods
export const onDragOver = (ev) => {

    ev.preventDefault();
    console.log('ondragover');

   

}

export const onDrag = (ev) => {
    console.log('onDrag');

  

}

export const onDragEnd = (ev) => {
  console.log("onDragEnd");
  onAfterDrop({isAdd:false});
};


export const onDragStart = (ev, question, setDraggedQuestion) => {
    ev.dataTransfer.setData("text", ev.target.id);
    setDraggedQuestion(question)
    // ev.target.style.display = "none";

 onAfterDrop({});

}



const onAfterDrop = ({isAdd=true})=>{

       const dropZones = document.getElementsByClassName("drop-zone");
       for (let i of dropZones) {
         const parent = i.children[0];
         const line = parent.children[0];

       isAdd
         ? line.children[0].classList.add("drop-zone-height")
         : line.children[0].classList.remove("drop-zone-height");
       }

}