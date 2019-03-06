



export const addStartTime = lessonId => {
    Meteor.call('addStartTime', {lessonId}, (err, ok) => {
        console.log(err, ok);
    })
}

export const addEndTime = lessonId => {
    Meteor.call('addEndTime', { lessonId }, (err, ok) => {
        console.log(err, ok);
    })
}

export const recordAttempt = ({ lessonId, questionIndex}) => {
    Meteor.call('recordAttempt', { lessonId, questionIndex}, (err, ok) => {
        console.log(err, ok);
    })
}