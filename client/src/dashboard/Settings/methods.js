import { COL_LANGUAGES } from "../../../../lib/Collections";

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

export const saveLanguage =({name,_id,callback})=> {
    if (!name || name.toString().trim() == '') {
        M.toast({html:"name can't be empty"})
        return;
    } else if (COL_LANGUAGES.findOne({ name: new RegExp(name, "i") },{fields:{}}) && !_id){
        M.toast({ html: 'Sorry language already exists!' })
        return;
    }

    Meteor.call('Settings.saveLanguage', {name, _id}, (err, ok) => {
        console.log(err, ok);
        //TODO: custom msg
        err && alert('Sorry error occured') || M.toast({ html: 'Done!' }) && callback();
    })
}


export const deleteLesson = _id => {
    Meteor.call('deleteLesson', _id, (err, ok) => {
        console.log(err, ok);
        err && alert('Sorry error occured') || alert('Lesson Updated!')
    })
}