import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { COL_Lessons } from '../../lib/Collections'

// create an icon reference

// Todo: Clean 
Meteor.methods({
    saveLesson(lesson){
        COL_Lessons.insert(lesson, err => err ? console.log(err.reason) : 'success')
    }
})