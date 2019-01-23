export const saveLesson = lesson => {



    Meteor.call('saveLesson', lesson, (err, ok) => {
        console.log(err, ok);
        err && alert('Sorry error occured') || alert('Lesson saved!')
    })
}


export const editLesson = lesson => {
    Meteor.call('editLesson', lesson, (err, ok) => {
        console.log(err, ok);
        err && alert('Sorry error occured') || alert('Lesson saved!')
    })
}