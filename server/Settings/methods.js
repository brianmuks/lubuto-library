import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { COL_LANGUAGES, COL_CONFIG } from "../../lib/Collections";
import { fileDb } from "../fileUpload/MediaUpload";

Meteor.methods({
  "Settings.setCentre"({ centre, _id }) {
    const query = { _id };
    let update = { ...centre };
    return COL_CONFIG.update(query, { $set: update }, { upsert: true });
  },
  "Settings.saveLanguage"({ name, _id }) {
    const query = { _id };
    let update = { name, label: name.toLowerCase().substring(0, 3) };
    return COL_LANGUAGES.update(query, { $set: update }, { upsert: true });
  },
  "Settings.deleteLanguage"(_id) {
    return COL_LANGUAGES.remove(_id);
  },
  "Settings.deleteFile"({ _id }) {
    _id && fileDb.remove(_id);
  },
});
