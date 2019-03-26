import { COL_LANGUAGES, COL_Lessons } from "../../../../lib/Collections";

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


export const deleteLanguage = ({_id,callback}) => {

    const query = {'meta.languageId': _id};
    if (COL_Lessons.findOne(query)) {
        M.toast({ html: 'Sorry language has lessons dependent on it!' })
        return;
    }
  

    Meteor.call('Settings.deleteLanguage', _id, (err, ok) => {
        err && alert('Sorry error occured') || M.toast({ html: 'Language Deleted' }) && callback()
    })
}

export const exportLanguages = () => {
    Meteor.call('Sync.exportLanguages', (err, ok) => {
        err && alert('Sorry error occured') || M.toast({ html: 'Languages Exported' }); 
    })
}
export const importLanguages = () => {
    Meteor.call('Sync.importLanguages', (err, ok) => {
        err && alert('Sorry error occured') || M.toast({ html: 'Languages Imported' }); 
    })
}