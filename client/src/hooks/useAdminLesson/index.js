import { useState } from "react";
import { LESSON_TYPES } from "./constants";

const useAdminLesson = ({ lesson }) => {
  const [lessonType, setLessonType] = useState(null);

  const handleLessonTypeChange = (value) => {
    if (!LESSON_TYPES) return M.toast({ html: "Sorry something went wrong " });

    setLessonType(value);



    Meteor.call(
      "changeLessonType",
      { lessonId: lesson._id, newType: value },
      (err, resp) => {
        if (err) return M.toast({ html: "Sorry error occured" });

        if (resp.isError) {
          return M.toast({ html: resp.msg });
        }

        M.toast({ html: "Lesson Edited " });
      }
    );
  };

  return {
    handleLessonTypeChange,
    lessonType,
  };
};

export default useAdminLesson;
