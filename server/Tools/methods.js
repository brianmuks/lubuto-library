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

        // var fut = new Future();

        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
            
                resolve(files)
            })
        });

      

        
    }

})




