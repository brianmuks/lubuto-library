import { Meteor } from 'meteor/meteor'
import { COL_Lessons } from '../../lib/Collections'

Meteor.publish("lesson_numbers", () =>
  COL_Lessons.find(
    {},
    {
      fields: {
        "meta.lessonNumber": 1,
        "meta.lang": 1,
        "meta.lessonPageNumber": 1,
      },
    }
  )
);
Meteor.publish("lesson", (_id) => COL_Lessons.find({ _id}));
