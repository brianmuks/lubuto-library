



export const saveLesson = lesson => {


    Meteor.call('saveLesson', lesson, (err, ok) => {
        console.log(err, ok);
        err && alert('Sorry error occured') || alert('Lesson saved!')
    })
}