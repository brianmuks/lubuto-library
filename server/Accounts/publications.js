import { Meteor } from 'meteor/meteor'

// for all users
Meteor.publish('users', () => Meteor.users.find({}))

// for a specific user
Meteor.publish('user', _id => Meteor.users.find({_id}))
