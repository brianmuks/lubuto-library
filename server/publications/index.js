import { Meteor } from 'meteor/meteor'
import { COL_LANGUAGES } from '../../lib/Collections'

Meteor.publish('pub_col_languages', () => COL_LANGUAGES.find({}))


