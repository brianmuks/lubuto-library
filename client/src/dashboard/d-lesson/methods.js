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


export const getSound = src => {

    return new Promise((resolve, reject) => {
        Meteor.call('Tool.getSound', src, (err, ok) => {

            console.log(err, ok);
            if (err) {
                reject(err)
            }else{
                resolve(ok);
            }

        })
    });


}