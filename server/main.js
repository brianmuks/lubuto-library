// The main entry for all server files
import { Meteor } from 'meteor/meteor'
import { COL_Centers } from '../lib/Collections'
import '../lib/Collections'
import './Tools/methods'
import './Tools/publications'
import './Lesson'
import './Accounts/methods'
import './Settings/methods'
import './Sync'
import './Accounts/publications'
import './Stats/methods'
import './Stats/publications'
import './Constants'
import "./fileUpload/MediaUpload";
import "./fileUpload/ResultCodes";



Meteor.startup(() => {
    if (!COL_Centers.find().count()) {
       
        const _centers = [
            {name: 'Garden '},
            {name: 'Mtunzi'},
            {name: 'Choma'},
            {name: 'anonymous'}
        ]
        // insert centers
       // _centers.forEach((center => COL_Centers.insert(center)))
        
    }
})
