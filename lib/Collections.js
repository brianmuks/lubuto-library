import { Mongo } from 'meteor/mongo';

// Tools, these will include icons

//renamed tools to COL_Tools for readability purposes. avaoid conflict with component/ names
export const COL_TOOLS = new Mongo.Collection('tools', { idGeneration: String })
export const COL_Lessons = new Mongo.Collection('lessons')
export const USER_STATS = new Mongo.Collection('userStats', {idGeneration: String})

