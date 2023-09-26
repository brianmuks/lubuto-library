import React, { useEffect, useState, useContext } from "react";
import { initModal } from "../../../utilities/Form";
import { TOOLS_STATE } from "../../d-context";
import SetRightAnsView from "./SetRightAns";
import SetLessonNo from "./SetLessonNo";
import { setLessonNumber, setMeta } from "../../d-redux/actions/lessonActions";
import { getUrlParam } from "../../../utilities/Tasks";
import SetSpeakerIntruction from "./SetSpeakerIntruction";
import { SetLessonPageNo } from "./SetLessonMetaData";
import { Row, Select } from "antd";
import useAdminLesson from "../../../hooks/useAdminLesson";
import { LESSON_TYPES } from "../../../hooks/useAdminLesson/constants";

export const TOOL_CONFIG_MODAL_ID = "tool-congfig-modal";

function ToolConfig({ isEdit, lessonId, lesson }) {
  const { state, dispatch } = useContext(TOOLS_STATE);
  // const [lessonNumber, setLessonNumber] = useState(null);

  const { lessonType, handleLessonTypeChange } = useAdminLesson({ lesson });

  const setLessonNumber = (e) => {
    const lessonNumber = parseInt(e.target.value);
    dispatch(setMeta({ lessonNumber }));
  };

  const setLessonPageNumber = (e) => {
    const lessonPageNumber = parseInt(e.target.value);
    dispatch(setMeta({ lessonPageNumber }));
  };

  const x = 1; //prevent unsessary reloads or change states

  useEffect(() => {
    initModal("#" + TOOL_CONFIG_MODAL_ID);
  }, [x]);

  const isExeLesson = getUrlParam("type") === "instr";

  return (
    <div id={TOOL_CONFIG_MODAL_ID} className="modal bottom-sheet  ">
      <div className="col">
        <h4>Lesson Settings </h4>
        <h6 className="teal-text  ">
          {" "}
          {LESSON_TYPES[getUrlParam("type")]?.value}{" "}
        </h6>
      </div>

      <SetSpeakerIntruction
        lessonNumber={state.meta.lessonNumber}
        dispatch={dispatch}
      />
      <div className="modal-content">
        <div className=" col m12 lesson-number-config">
          <SetLessonPageNo
            setLessonPageNumber={setLessonPageNumber}
            lessonPageNumber={state.meta.lessonPageNumber}
          />
          <SetLessonNo
            lessonNumber={state.meta.lessonNumber}
            setLessonNumber={setLessonNumber}
          />
          {lesson && (
            <Select
              defaultValue={lesson.meta.type}
              style={{ width: 120 }}
              onChange={handleLessonTypeChange}
              options={Object.values(LESSON_TYPES).map((i) => i)}
            />
          )}
        </div>
        <SetRightAnsView
          isExeLesson={isExeLesson}
          dispatch={dispatch}
          lessonId={lessonId}
          isEdit={isEdit}
          staggedTools={state.staggedTools}
        />
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">
          Done
        </a>
      </div>
    </div>
  );
}

export default ToolConfig;
