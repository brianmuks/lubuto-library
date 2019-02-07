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


export const getImages = src => {

    return new Promise((resolve, reject) => {
        Meteor.call('Tool.getSound', src, (err, ok) => {

            console.log(err, ok);
            if (err) {
                reject(err)
            } else {
                resolve(ok);
            }

        })
    });

}

export const getResourceEditorStyles = ()=>(
    [
        { name: 'color', label: 'Color' },
         { label: 'Background Color', name: 'background-color' }
        , { name: 'padding', label: 'Padding' }, 
        { name: 'fontSize', label: 'Size' }, 
        { name: 'border-radius', label: 'Border' }
        , { name: 'width', label: 'Container Width' }, 
        { name: 'height', label: 'Container Height' },
        { name: 'width', label: 'Width' }, 
        { name: 'height', label: 'Height' }
    ]
)