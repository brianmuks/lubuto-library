import { Meteor } from 'meteor/meteor'
import { COL_TOOLS } from '../../lib/Collections'

Meteor.publish('tools', () => COL_TOOLS.find({}))
