import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

Meteor.methods({
    updateUser(id, name, age){
        check(id, String)
        check(name, String)
        check(age, String)
        Meteor.users.update(
            {_id: id},
            {
                $set: {
                    'profile.name': name,
                    'profile.age': age
                }
            }
        )
    }
})
