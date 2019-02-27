import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { COL_TOOLS } from '../../lib/Collections'
import { FILE_SERVER_PATH } from '../Constants';
const fs = require('fs');


// create an icon reference

// Todo: Clean 
Meteor.methods({
    createIcon(name,label){
        check(name, String)
        COL_TOOLS.insert({name,label}, err => err ? console.log(err.reason) : 'success')
    },

    'Tool.getSound'(src=''){
        const path =FILE_SERVER_PATH+src;

        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                resolve(sortFiles(files));
            })
        });
        
    },
    'Tool.getImages'(src = 'images') {
        const path =FILE_SERVER_PATH + src;
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
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
    });
}




