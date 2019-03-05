import { Meteor } from 'meteor/meteor'
import { COL_USER_STATS } from '../../../lib/Collections';

// create an icon reference

// each time a student views a lesson a clock is started
//basically a time log is stored
Meteor.methods({
    addStartTime(lesson) {
        const query = 
        update = { startTime: new Date()};
        COL_USER_STATS.update(query,update,{upsert:true});
    },
})