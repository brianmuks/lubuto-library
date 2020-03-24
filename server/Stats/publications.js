import { Meteor } from 'meteor/meteor'
import { COL_USER_STATS } from '../../lib/Collections'

Meteor.publish('col_user-stats', () => COL_USER_STATS.find({}))


