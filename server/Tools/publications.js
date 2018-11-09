import { Meteor } from 'meteor/meteor'
import { Tools } from '../../lib/Collections'

Meteor.publish('col_tools', () => Tools.find({}))
