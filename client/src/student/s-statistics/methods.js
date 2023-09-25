



export const addStartTime = ({ lessonId, lang, lessonNumber,lessonPageNumber }) => {
    Meteor.call('addStartTime', { lessonId, lang, lessonNumber, lessonPageNumber }, (err, ok) => {
    })
}

export const addEndTime = lessonId => {
    Meteor.call('addEndTime', { lessonId }, (err, ok) => {
    })
}

export const recordAttempt = ({ lessonId, questionIndex, passed}) => {
    Meteor.call('recordAttempt', { lessonId, questionIndex, passed}, (err, ok) => {
    })
}