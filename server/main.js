// The main entry for all server files
import { Meteor } from 'meteor/meteor'
import { Centers } from '../lib/Collections'
import '../lib/Collections'
import './Tools/methods'
import './Tools/publications'
import './Lesson'
import './Accounts/methods'
import './Accounts/publications'
import './Stats/methods'
import './Stats/publications'
import './Constants'



Meteor.startup(() => {
    if (!Centers.find().count()) {
        const _centers = [
            {name: 'Garden '},
            {name: 'Mtunzi'},
            {name: 'Choma'},
            {name: 'anonymous'}
        ]
        // insert centers
        _centers.forEach((center => Centers.insert(center)))
        
    }
})
