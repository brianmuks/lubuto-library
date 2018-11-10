import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { COL_TOOLS } from '../../lib/Collections'

// create an icon reference

// Todo: Clean 
Meteor.methods({
    createIcon(name,label){
        check(name, String)
        COL_TOOLS.insert({name,label}, err => err ? console.log(err.reason) : 'success')
    }
})