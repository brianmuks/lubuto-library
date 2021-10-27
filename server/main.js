// The main entry for all server files
import { Meteor } from "meteor/meteor";
import { COL_Centers } from "../lib/Collections";
import "../lib/Collections";
import "./Tools/methods";
import "./Tools/publications";
import "./Lesson";
import "./Accounts/methods";
import "./Settings/methods";
import "./Settings/publications";
import "./Sync";
import "./Accounts/publications";
import "./Stats/methods";
import "./Stats/publications";
import "./publications";
import "./Constants";
import "./fileUpload/MediaUpload";
import "./fileUpload/ResultCodes";
import { FILE_SERVER_PATH } from "./Constants";

fs = Npm.require("file-system"); //file system(fs)
require("dotenv").config();

Meteor.startup(() => {
  if (!fs.existsSync(FILE_SERVER_PATH)) {
    // removed the forward slash to not confuse it with the root files

    fs.mkdirSync(FILE_SERVER_PATH);
  }

  if (!COL_Centers.find().count()) {
    const _centers = [
      { name: "Garden " },
      { name: "Mtunzi" },
      { name: "Choma" },
      { name: "anonymous" },
    ];
    // insert centers
    // _centers.forEach((center => COL_Centers.insert(center)))
  }
});
