import { Mongo } from 'meteor/mongo';

// Tools, these will include icons

//renamed tools to COL_Tools for readability purposes. avaoid conflict with component/ names
export const COL_TOOLS = new Mongo.Collection('tools', {idGeneration: String})

