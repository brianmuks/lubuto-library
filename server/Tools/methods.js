import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { COL_TOOLS } from '../../lib/Collections'
const fs = require('fs');


// create an icon reference

// Todo: Clean 
Meteor.methods({
    createIcon(name,label){
        check(name, String)
        COL_TOOLS.insert({name,label}, err => err ? console.log(err.reason) : 'success')
    },

    'Tool.getSound'(src=''){
        const path = '/lubuto-assets/'+src;

        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                resolve(sortFiles(files));
            })
        });

        
    },
    'Tool.getImages'(src = 'images') {
        const path = '/lubuto-assets/' + src;
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                resolve(sortFiles(files));
            })
        });

    }

})





function sortFiles(files) {
    if (!files) return; // don't sort if there are no files
   return files.sort(function (a, b) {
       console.log(a);
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
    });
}




