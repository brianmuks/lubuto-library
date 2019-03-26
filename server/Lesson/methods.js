import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { COL_Lessons } from '../../lib/Collections'

// create an icon reference

// Todo: Clean 
Meteor.methods({
    saveLesson(lesson){
        lesson['createdAt'] = new Date();
        COL_Lessons.insert(lesson, err => err ? console.log(err.reason) : 'success')
    },
    editLesson(lesson) {
        return COL_Lessons.update({ _id: lesson.lessonId }, { $set: lesson}, err => err ? console.log(err.reason) : 'success')
    },
    deleteLesson(_id) {
        return COL_Lessons.remove(_id, err => err ? console.log(err.reason) : 'success')
    },
                                            //newLangs is array of languages
    'Lesson.copyLesson'({ lessonNumber,lang,newLangs}) {

        const query = { 'meta.lessonNumber': lessonNumber, 'meta.lang': lang} 
        const lesssons = COL_Lessons.find(query).fetch(); 
        
        //loop thru all langs

                //newLang is the has the same value as newLangs[newLang]
                for (const newLang in newLangs) {

                //copy/update lesson to new language
                lesssons.forEach((v, i) => {
                    console.log(v, 'lessons')
                    const {meta,content} = v;
                    const lesson = { meta: {...meta,lang:newLang},content};
                    const query2 = { 'meta.lessonNumber': lessonNumber, 'meta.lang': newLang, 'meta.lessonPageNumber': meta.lessonPageNumber }
                    COL_Lessons.update(query2, { $set: lesson }, { upsert: true }, err => err ? console.log(err.reason) : 'success')
                })
            }

         
        return true;
    },

})