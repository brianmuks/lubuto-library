import { COL_Lessons } from "../../../../lib/Collections";



export const getFilteredLessons = lessonStats=>{

    let filteredLessons = [];
    console.log(lessonStats)
lessonStats.map((stats,index)=>{
    const lang = stats.lang;
    const lessonNumber = stats.lessonNumber;
    const entry = { lang, lessonNumber, pages: 1,completed: getPassStatus(stats.question) };
    
    if (!filteredLessons[lessonNumber]) {
        filteredLessons[lessonNumber] = entry;
    }else{
        const lesson = filteredLessons[lessonNumber];
        console.log(filteredLessons)
        filteredLessons[lessonNumber] = { ...lesson, pages: lesson.pages + 1, completed: getPassStatus(stats.question)};
    }
    
   }
    )  
    return filteredLessons;
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


const eExists = (arr,e) =>(
    arr.indexOf(e) === 1 && true
)