import React, { useContext, useState, useReducer, useEffect } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { getUrlParam } from "../../utilities/Tasks";
import { COL_USER_STATS } from "../../../../lib/Collections";
function ScoreBoard({ lesson, stats }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (lesson) {
      const _lesson = lesson.content;
      const _questions = lesson.content;
      const keyQuestions = [];
      for (const key in _questions) {
        if (_questions[key].isQuestion) {
          const questionIndex = _questions[key].index;
          const entry = { index: questionIndex };
          const _questionIndex = questionIndex.toString().replace(".", "-");
          console.log(questionIndex, "questionIndex");
          if (stats && stats.question) {
            entry["passed"] =
              stats.question[_questionIndex] &&
              stats.question[_questionIndex].passed;
            console.log(
              "entry",
              stats.question["0-4236071277549145"],
              "_questions=>",
              _questions
            );
          }

          keyQuestions.push(entry);
        }
      }
      setQuestions(keyQuestions);
    }
  }, [lesson, stats]);

  return (
    <div className="col m5 offset-m4 grey lighten-3 resource-editor">
      <h6>Score Board</h6>

      <div className="row">
        {questions.map((style, key) => (
          <StyleTool
            label={style.label}
            name={style.name}
            key={key}
            index={key}
            passed={style.passed}
          />
        ))}
      </div>
      <div className={"col s6 center"}>
        <i className={`fa material-icons `}></i>
      </div>
      <br />
    </div>
  );
}

function StyleTool({ name, passed, index, _dispatch }) {
  return (
    <div key={index} className="input-field col s2">
      <input
        // removed the defaultVaue
        value={index + 1}
        disabled
        id={name}
        type="text"
        className="validate"
      />
      {/* <label className="active" htmlFor={name}>{label}</label> */}
      {(passed && (
        <i className="material-icons green-text">thumb_up_alt</i>
      )) || <i className="material-icons">thumb_down_alt</i>}
    </div>
  );
}

export default withTracker((props) => {
  Meteor.subscribe("col_tools");
  Meteor.subscribe("users");
  const lessonId = getUrlParam("id");
  const query = { lessonId };
  return {
    // lessons: COL_Lessons.find(query).fetch(),
    stats: COL_USER_STATS.findOne(query),
  };
})(ScoreBoard);
