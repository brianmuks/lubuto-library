import { COL_Lessons, COL_USER_STATS } from "../../../../lib/Collections";



export const getFilteredLessons = lessonStats=>{

    let filteredLessons = [];
    console.log(lessonStats)
lessonStats.map((stats,index)=>{
    const lang = stats.lang;
    const lessonNumber = stats.lessonNumber;
    
    if (!filteredLessons[lessonNumber]) {
        const passStatus = getPassStatus(stats.question);
        const entry = { totalTime: stats.time && stats.time || 0, createdAt: stats.createdAt, lang, lessonNumber, pages: 1,completed: passStatus };
        filteredLessons[lessonNumber] = entry;
    }else{
        const lesson = filteredLessons[lessonNumber];
        const passStatus = getPassStatus(stats.question);
        filteredLessons[lessonNumber] = { ...lesson, pages: lesson.pages + 1,
            completed: passStatus, totalTime: stats.time && lesson.totalTime+stats.time || lesson.totalTime};
    }
    
   }
    )  
    return filteredLessons;
}


export const getlessonsGrandTotal = lessonStats => {

    let filteredLessons = [];
    let gTotalTime = 0;
    let gPages = 0;
    let passMark = 0;
    let failMark = 0;
    lessonStats.map((stats, index) => {
        const lang = stats.lang;
        const lessonNumber = stats.lessonNumber;
        gTotalTime += stats.time && stats.time || gTotalTime;
        gPages++;
        if (!filteredLessons[lessonNumber]) {
            const passStatus = getPassMarkSummary(stats.question);
            passStatus && passMark++ || failMark++;
            const entry = { createdAt: stats.createdAt, lang, lessonNumber, pages: 1,  };
            filteredLessons[lessonNumber] = entry;
        } else {
            const lesson = filteredLessons[lessonNumber];
            const passStatus = getPassMarkSummary(stats.question);
            passMark +=passStatus.passMark;
            failMark +=passStatus.failMark;
            filteredLessons[lessonNumber] = {
                ...lesson, pages: lesson.pages + 1,
            };
        }

    }
    )
    return { filteredLessons,gTotalTime,passMark,failMark};
}


export const getProgress  = ({pages,lessonNumber,lang}) =>{
    const query = {'meta.lang':lang,'meta.lessonNumber':lessonNumber};
    const allPages =COL_Lessons.find(query).count();
    return {allPages,pages,progress:allPages === pages};
}

export const getPassStatus = questions =>{
    for (const key in questions) {
        if (!questions[key].passed) {
            return  false;
        }
    }
    return true;
}


export const getPassMarkSummary = questions => {
    let passMark = 0;
    let failMark = 0;
    for (const key in questions) {
        if (!questions[key].passed) {
            passMark++
        }else{
            failMark++;
        }
    }
    return { passMark, failMark};
}



export const getAttempts = question => {
    let attempts = 0;
    let questions = 0;
    for (const key in question) {
        attempts +=question[key].attempts;
        questions++;
    }
    return { attempts, questions};
}

export const formatTime = time =>(

    time > 60 && Math.floor(time / 60)+'hr'
            || time + 'min'

)

export const onLessonChange = ({ e, userId})=>{
    let val = e.target.value;
    val = val.split(',');
    const query = { userId, lang: val[1], lessonNumber: parseInt(val[0]) };
    return COL_USER_STATS.find(query).fetch();
}


const eExists = (arr,e) =>(
    arr.indexOf(e) === 1 && true
)