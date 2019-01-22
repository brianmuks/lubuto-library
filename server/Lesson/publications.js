import { Meteor } from 'meteor/meteor'
import { COL_Lessons } from '../../lib/Collections'

Meteor.publish('lessons', () => COL_Lessons.find({}))
