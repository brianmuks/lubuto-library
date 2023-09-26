import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { COL_Lessons } from "../../lib/Collections";

// create an icon reference

// Todo: Clean
Meteor.methods({
  saveLesson(lesson) {
    lesson["createdAt"] = new Date();
    return COL_Lessons.insert(lesson, (err) => {});
  },
  editLesson(lesson) {
    return COL_Lessons.update(
      { _id: lesson.lessonId },
      { $set: lesson },
      (err) => {}
    );
  },
  resetLessonSettings(lesson) {
    const newContent = lesson.content.map((i) => {
      const lessonData = i;

      delete lessonData["isQuestion"];
      delete lessonData["isAns"];
      delete lessonData["questionIndex"];

      return lessonData;
    });

    const updateData = {
      ...lesson,
      content: newContent,
      meta: {
        ...lesson.meta,
        type: "instr",
      },
    };

    return COL_Lessons.update(
      { _id: lesson.lessonId },
      { $set: updateData },
      (err) => {}
    );
  },
  changeLessonType({ lessonId, newType }) {
    const query = { _id: lessonId };

    const lessonDb = COL_Lessons.findOne(
       query ,
      {
        fields: {
          meta: 1,
        },
      }
    );

    if (!lessonDb)
      return {
        isError: true,
        msg: "Sorry lesson does not exist",
      };

    const updateData = {
      meta: {
        ...lessonDb.meta,
        type: newType,
      },
    };

    return COL_Lessons.update(query, { $set: updateData }, (err) => {});
  },
  deleteLesson(_id) {
    return COL_Lessons.remove(_id, (err) => {});
  },
  //newLangs is array of languages
  "Lesson.copyLesson"({ lessonNumber, lang, newLangs }) {
    const query = { "meta.lessonNumber": lessonNumber, "meta.lang": lang };
    const lesssons = COL_Lessons.find(query).fetch();

    //loop thru all langs

    //newLang is the has the same value as newLangs[newLang]
    for (const newLang in newLangs) {
      //copy/update lesson to new language
      lesssons.forEach((v, i) => {
        const { meta, content } = v;
        const lesson = { meta: { ...meta, lang: newLang }, content };
        const query2 = {
          "meta.lessonNumber": lessonNumber,
          "meta.lang": newLang,
          "meta.lessonPageNumber": meta.lessonPageNumber,
        };
        COL_Lessons.update(
          query2,
          { $set: lesson },
          { upsert: true },
          (err) => {}
        );
      });
    }

    return true;
  },

  "Lesson.copyPage"({ lessonNumber, lessonPageNumber, lang, newLangs }) {
    const query = {
      "meta.lessonNumber": lessonNumber,
      "meta.lang": lang,
      "meta.lessonPageNumber": lessonPageNumber,
    };
    const lesssons = COL_Lessons.find(query).fetch();

    //loop thru all langs

    //newLang is the has the same value as newLangs[newLang]
    for (const newLang in newLangs) {
      //copy/update lesson to new language
      lesssons.forEach((v, i) => {
        const { meta, content } = v;
        const lesson = { meta: { ...meta, lang: newLang }, content };
        const query2 = {
          "meta.lessonNumber": lessonNumber,
          "meta.lang": newLang,
          "meta.lessonPageNumber": meta.lessonPageNumber,
        };
        COL_Lessons.update(
          query2,
          { $set: lesson },
          { upsert: true },
          (err) => {}
        );
      });
    }

    return true;
  },
});
