
export const setCentre = ({centre,_id}) => {
  
    validateCentre(centre) && Meteor.call('Settings.setCentre', { centre, _id}, (err, ok) => {
        err && alert('Sorry error occured') || M.toast({html:'Centre Updated!'})
    })
}

function validateCentre(centre){
    for (const key in centre) {
        if (!centre[key] || centre[key].toString().trim() === '') {
            M.toast({ html: `${key.toUpperCase()} can't be empty` })
            return false;   
        }
}
return true;
}

export const deleteLesson = _id => {
    Meteor.call('deleteLesson', _id, (err, ok) => {
        console.log(err, ok);
        err && alert('Sorry error occured') || alert('Lesson Updated!')
    })
}