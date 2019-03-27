import { Meteor } from 'meteor/meteor'
import { COL_LANGUAGES, COL_CONFIG, COL_Lessons, COL_TOOLS } from '../../lib/Collections';
import { EXPORTS_PATH, LANGUAGES_EXPORTS_PATH, LESSONS_EXPORTS_PATH, TOOLS_EXPORTS_PATH, STATS_EXPORTS_PATH } from '../Constants';
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
    'Sync.exportTools'(_id) {
        // const path = process.env.HOME+'/';
        let tools = COL_TOOLS.find({}).fetch();
        tools = JSON.stringify(tools);
        write2File({ file: tools, path: TOOLS_EXPORTS_PATH })
    },
    'Sync.importTools'() {
        readFileContent({ path: TOOLS_EXPORTS_PATH })
            .then(data => {
                data = JSON.parse(data);
                data.forEach(tool => {
                    const query = { _id: tool._id }
                    COL_TOOLS.update(query, { $set: tool }, { upsert: true });
                });
            })
            .catch(err => {
                console.log(err)
            })
    },

    'Sync.exportStats'(stats) {
        // const path = process.env.HOME+'/';
        stats = JSON.stringify(stats);
        write2File({ file: stats, path: STATS_EXPORTS_PATH })
    },
})

//move to utills

