import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Tools } from '../../lib/Collections'

// create an icon reference

// Todo: Clean 
Meteor.methods({
    createIcon(name){
        check(name, String)
        Tools.insert({name}, err => err ? console.log(err.reason) : 'success')
    }
})