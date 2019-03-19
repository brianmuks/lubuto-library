import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { COL_LANGUAGES, COL_CONFIG } from '../../lib/Collections';

Meteor.methods({
    'Settings.setCentre'({ centre, _id}){
        const query = {_id};
        let update = {...centre};
        COL_CONFIG.update(query,{$set:update},{upsert:true});
    },
    'Settings.saveLanguage'({ name, _id}){
        const query = {_id};
        let update = { name,label:name.toLowerCase().substring(0,3)};
        COL_LANGUAGES.update(query,{$set:update},{upsert:true});
    },
})
