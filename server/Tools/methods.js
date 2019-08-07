import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { COL_TOOLS } from '../../lib/Collections'
import { FILE_SERVER_PATH } from '../Constants';
import { fileDb } from '../fileUpload/MediaUpload';
const fs = require('fs');

// create an icon reference

// Todo: Clean 
Meteor.methods({
    createIcon(name,label){
        check(name, String)
        COL_TOOLS.insert({name,label}, err => err ? console.log(err.reason) : 'success')
    },

    /**
     * 
     * @param {*} src search directory
     * @param {*} filter if passed, only files containing filter key word will be returned 
     */
    'Tool.getSound'(src , filter=null){
        const path =FILE_SERVER_PATH+src;
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                //TODO get error messge if directory is not present
                resolve(sortFiles(files));
            })
        });
    },
    'Tool.getImages'() {
        return fileDb.find({ isImage: true }).fetch();
    },

})


function sortFiles(files) {
    if (!files) return; // don't sort if there are no files
   return files.sort(function (a, b) {
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
    });
}
