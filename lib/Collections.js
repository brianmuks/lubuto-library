import { Mongo } from 'meteor/mongo';

// Tools, these will include icons

//renamed tools to COL_Tools for readability purposes. avoid conflict with component/ names
export const COL_TOOLS = new Mongo.Collection('tools', { idGeneration: String })
export const COL_Lessons = new Mongo.Collection('lessons')
export const COL_LANGUAGES = new Mongo.Collection('languages')
export const COL_USER_STATS = new Mongo.Collection('user_stats', {idGeneration: String})
export const COL_Centers = new Mongo.Collection('centers', { idGeneration: String })
export const COL_CONFIG = new Mongo.Collection('config', { idGeneration: String })
