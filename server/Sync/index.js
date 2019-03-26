import { Meteor } from 'meteor/meteor'
import { COL_LANGUAGES, COL_CONFIG, COL_Lessons } from '../../lib/Collections';
import { EXPORTS_PATH, LANGUAGES_EXPORTS_PATH, LESSONS_EXPORTS_PATH } from '../Constants';
import { write2File, readFileContent } from '../utils';
const fs = require('fs');

Meteor.methods({
    'Sync.exportLanguages'() {
        // const path = process.env.HOME+'/';
       let langs=  COL_LANGUAGES.find({}).fetch();
        langs = JSON.stringify(langs);
        write2File({file:langs, path:LANGUAGES_EXPORTS_PATH})
    },
    'Sync.importLanguages'() {
       
        readFileContent({path:LANGUAGES_EXPORTS_PATH})
                .then(data=>{   
                data = JSON.parse(data);   
                
                data.forEach(lang => {
                    const query = {_id:lang._id}
                    COL_LANGUAGES.update(query, { $set: lang }, { upsert: true });
                });

                })
                .catch(err=>{
                console.log(err)
                })    
    },
    'Sync.exportLessons'(_id) {
        // const path = process.env.HOME+'/';
        let lessons = COL_Lessons.find({}).fetch();
        lessons = JSON.stringify(lessons);
        write2File({ file: lessons, path: LESSONS_EXPORTS_PATH })
    },
    'Sync.importLessons'() {
        readFileContent({ path: LESSONS_EXPORTS_PATH })
            .then(data => {
                data = JSON.parse(data);
                data.forEach(lesson => {
                    const query = { _id: lesson._id }
                    COL_Lessons.update(query, { $set: lesson }, { upsert: true });
                });
            })
            .catch(err => {
                console.log(err)
            }) 
    },
})

//move to utills

