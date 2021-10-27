import { Meteor } from "meteor/meteor";
import { COL_CONFIG } from "../../lib/Collections";

Meteor.publish("col_config", () => COL_CONFIG.find({}));
