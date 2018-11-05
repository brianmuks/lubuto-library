import { Meteor } from 'meteor/meteor'
import { Tools } from '../../lib/Collections'

Meteor.publish('tools', () => Tools.find().fetch())
