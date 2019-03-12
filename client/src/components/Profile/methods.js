


export const getFilteredLessons = lessonStats=>{

    let filteredLessons = [];
lessonStats.map((stats,index)=>{
    const lang = stats.lang;
    const lessonNumber = stats.lessonNumber;
    const entry = { lang, lessonNumber };
    
    if (eExists(filteredLessons, entry)) {
        filteredLessons[lessonNumber] = entry;

    }
    
    // eExists(filteredLessons,lessonNumber) && filteredLessons.push(lessonNumber);
   }
    )  
    return filteredLessons;
}


const eExists = (arr,e) =>(
    arr.indexOf(e) === -1 && true
)