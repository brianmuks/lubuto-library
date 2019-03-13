import { COL_Lessons } from "../../../../lib/Collections";



export const getFilteredLessons = lessonStats=>{

    let filteredLessons = [];
    console.log(lessonStats)
lessonStats.map((stats,index)=>{
    const lang = stats.lang;
    const lessonNumber = stats.lessonNumber;
    const entry = { totalTime: stats.time && stats.time || 0, createdAt: stats.createdAt, lang, lessonNumber, pages: 1,completed: getPassStatus(stats.question) };
    
    if (!filteredLessons[lessonNumber]) {
        filteredLessons[lessonNumber] = entry;
    }else{
        const lesson = filteredLessons[lessonNumber];
        console.log(filteredLessons)
        filteredLessons[lessonNumber] = { ...lesson, pages: lesson.pages + 1,
            completed: getPassStatus(stats.question), totalTime: stats.time && lesson.totalTime+stats.time || lesson.totalTime};
    }
    
   }
    )  
    return filteredLessons;
}


export const getlessonsGrandTotal = lessonStats => {

    let filteredLessons = [];
    let gTotalTime = 0;
    let gPages = 0;
    lessonStats.map((stats, index) => {
        const lang = stats.lang;
        const lessonNumber = stats.lessonNumber;
        const entry = { createdAt: stats.createdAt, lang, lessonNumber, pages: 1, completed: getPassStatus(stats.question) };
        gTotalTime += stats.time && stats.time || gTotalTime;
        gPages++;
        if (!filteredLessons[lessonNumber]) {
            filteredLessons[lessonNumber] = entry;
        } else {
            const lesson = filteredLessons[lessonNumber];
            console.log(filteredLessons)
            filteredLessons[lessonNumber] = {
                ...lesson, pages: lesson.pages + 1,
                completed: getPassStatus(stats.question)
            };
        }

    }
    )
    return [filteredLessons,{gPages,gTotalTime}];
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



const eExists = (arr,e) =>(
    arr.indexOf(e) === 1 && true
)