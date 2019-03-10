


export const getFilteredLessons = lessonStats=>{

    let filteredLessons = [];
lessonStats.map((stats,index)=>{
    const lang = stats.lang;
    const lessonNumber = stats.lessonNumber;
    const entry = { lang, lessonNumber };
    eExists(filteredLessons, entry) && filteredLessons.push(entry);
    // eExists(filteredLessons,lessonNumber) && filteredLessons.push(lessonNumber);
   }
    )  
    return filteredLessons;
}


const eExists = (arr,e) =>(
    arr[e].indexOf(e) === -1 && true
)