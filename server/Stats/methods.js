import { Meteor } from 'meteor/meteor'
import { COL_USER_STATS } from '../../lib/Collections';
// create an icon reference

// each time a student views a lesson a clock is started
//basically a time log is stored
Meteor.methods({
    addStartTime({ lessonId, lang, lessonNumber }) {
        const coll = COL_USER_STATS;
        const userId = Meteor.userId();
        const _id = lessonId.substring(0,8)+userId.substring(0,8);
        const query =  { _id};
        const today = new Date();
        const update = coll.findOne({ query },{fields:{_id:1}}) && { startTime: today } 
            || { startTime: new Date(), createdAt: today, lessonId, userId, lang, lessonNumber };// createdAt  > track when the student started taking lessons
        coll.update(query, {$set:update}, { upsert: true });
    },
    addEndTime({ lessonId }) {

        const coll = COL_USER_STATS;
        const userId = Meteor.userId();
        const _id = lessonId.substring(0, 8) + userId.substring(0, 8);
        const query = { _id };
        const today = new Date();
        let { startTime, time } = coll.findOne(query) || {} ;

        if (!startTime) {
            //bug to be fixed, at times startTime=undefined
            return;
        }


        const timeDiff = Math.abs(today.getTime() - startTime.getTime());
        const timeInMin = Math.floor(timeDiff / 60000 );
        time = time && Math.abs(timeInMin + time) || timeInMin;
        const update = { time };
        coll.update(query, { $set: update });
    },


    recordAttempt({ lessonId, questionIndex, passed }) {



        const coll = COL_USER_STATS;
        const _id = lessonId.substring(0, 8) + Meteor.userId().substring(0, 8);
        const query = { _id };
        const today = new Date();
        const lessonStats = coll.findOne( query);
        let update =lessonStats && lessonStats.question  && {question:lessonStats.question} || {question:{}};
        questionIndex = questionIndex.toString().replace('.', '-');
        if (update.question[questionIndex] && update.question[questionIndex].passed) {
            return true;//student already got it right;
        }

        update.question[questionIndex] =lessonStats && lessonStats.question && lessonStats.question[questionIndex]  && {attempts:update.question[questionIndex].attempts+1,passed} ||
                                          {attempts:1,passed}
            coll.update(query, {$set:update});
    },
})