import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { COL_TOOLS } from "../../lib/Collections";
import { FILE_SERVER_PATH } from "../Constants";
import { fileDb } from "../fileUpload/MediaUpload";
const fs = require("fs");

// create an icon reference

// Todo: Clean
Meteor.methods({
  createIcon(name, label) {
    check(name, String);
    COL_TOOLS.insert({ name, label }, (err) =>
      err ? console.log(err.reason) : "success"
    );
  },

  /**
   *
   * @param {*} src search directory
   * @param {*} filter if passed, only files containing filter key word will be returned
   */
  "Tool.getSound"({ lang, lessonNumber }) {


    const query = {
      isAudio: true,
      'meta.lang': lang,
      'meta.lessonNumber': lessonNumber
    };



    return fileDb.find(query).fetch();



  },
  "Tool.getImages"() {
    return fileDb.find({ isImage: true }, { sort: { createdAt: -1 } }).fetch();
  },
});

function sortFiles(files) {
  if (!files) return; // don't sort if there are no files
  return files.sort(function (a, b) {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
  });
}
