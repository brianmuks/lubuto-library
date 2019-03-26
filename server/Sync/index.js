import { Meteor } from 'meteor/meteor'
import { COL_LANGUAGES, COL_CONFIG } from '../../lib/Collections';
const fs = require('fs');

Meteor.methods({
    'Sync.exportLanguages'() {
        const path = process.env.HOME+'/';
        console.log(path)
       //const langs=  COL_LANGUAGES.find({}).fetch();
    },
    'Sync.importLanguages'({ name, _id }) {
        const query = { _id };
        let update = { name, label: name.toLowerCase().substring(0, 3) };
        return COL_LANGUAGES.update(query, { $set: update }, { upsert: true });
    },
    'Sync.exportLessons'(_id) {
        return COL_LANGUAGES.remove(_id);
    },
    'Sync.importLessons'(_id) {
        return COL_LANGUAGES.remove(_id);
    },
})

//move to utills
function write2File(path,file){
    fs.writeFile(path, file, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}
