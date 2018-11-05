import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Tools } from '../../lib/Collections'

// create an icon reference

// Todo: Clean 
Meteor.methods({
    createIcon(name, size){
        check(name, String)
        check(size, String)
        Tools.insert({name})
    }
})