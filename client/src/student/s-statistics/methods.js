



export const addStartTime = ({ lessonId, lang, lessonNumber }) => {
    Meteor.call('addStartTime', { lessonId, lang, lessonNumber }, (err, ok) => {
        console.log(err, ok);
    })
}

export const addEndTime = lessonId => {
    Meteor.call('addEndTime', { lessonId }, (err, ok) => {
        console.log(err, ok);
    })
}

export const recordAttempt = ({ lessonId, questionIndex, passed}) => {
    Meteor.call('recordAttempt', { lessonId, questionIndex, passed}, (err, ok) => {
        console.log(err, ok);
    })
}