import { Meteor } from 'meteor/meteor'
import { USER_STATS } from '../../lib/Collections'

Meteor.publish('userStats', () => USER_STATS.find({}))


