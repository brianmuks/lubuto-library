import React, { useContext, useState } from "react";
//import { useDragging } from "./ResourceEditor";
import { STUDENT_LESSON_STATE } from "./../s-context";
import { IMAGE_EXTERNAL_URL } from "../../utilities/constants";
import { onDrop, playAudio, onDragOver, onDrag, onDragStart, onDragEnd } from "./methods";
import { recordAttempt } from "../s-statistics/methods";
import { getFileUrl } from "../../utilities/Tasks";

function MainScreen(props) {
  const { state } = useContext(STUDENT_LESSON_STATE);
  const { staggedTools, color, bgColor, lessonId } = state;

  console.log(props, "props");

  const [draggedQuestion, setDraggedQuestion] = useState(null);
  //for click to match lesson type
  const [c2mAns, setC2mAns] = useState(null);

  const onClickMatch = ({ a, q, index, rightAnsIndexs, questionIndex }) => {
    if (a && c2mAns && c2mAns.indexOf(index.toString()) !== -1) {
      setC2mAns(null);
      // playAudio("y.wav"); //y.wav is a default yes sound for every language;
      recordAttempt({ questionIndex, lessonId, passed: true });
    } else if (a && c2mAns && c2mAns.indexOf(index.toString()) == -1) {
      // playAudio("n.wav"); //n.wav is a default no sound for every language;
      recordAttempt({ questionIndex, lessonId, passed: false });
    } else if (!c2mAns && q) {
      //user clicked on a question
      setC2mAns(rightAnsIndexs);
    } else {
      // playAudio("n.wav"); //y.wav is a default yes sound for every language;
    }
  };

  return (
    // col m7 offset - m3
    <div className=" grey lighten-3 main-screen-4-lesson ">
      <audio
        src={`http://127.0.0.1:4000/audio/${
          props.lesson && props.lesson.meta.lang
        }/${props.lesson && props.lesson.meta.audioIntr}`}
        id="audio"
      >
        {/* <source   type="audio/wav" /> */}
      </audio>
      <RenderTools
        onClickMatch={onClickMatch}
        lesson={props.lesson}
        lessonId={lessonId}
        draggedQuestion={draggedQuestion}
        setDraggedQuestion={setDraggedQuestion}
        playAudio={playAudio}
        isPreview={(props.isPreview && true) || false}
        tools={staggedTools}
        color={color}
        bgColor={bgColor}
      />
    </div>
  );
}

function RenderTools({
  lessonId,
  playAudio,
  setDraggedQuestion,
  draggedQuestion,
  tools,
  lesson,
  onClickMatch,
}) {
  const { state, dispatch } = useContext(STUDENT_LESSON_STATE);
  // console.log(state.le)
  return tools.map((tool, index) => (
    // marginLeft: tool.style.x, marginTop: tool.style.y
    <div
      className={tool.isAns && "drop-zone"}
      style={
        (tool.style && {
          position: "absolute",
          left: tool.style.x,
          top: tool.style.y + 20,
        }) ||
        {}
      }
      // position={tool.style && { x: tool.style.x, y: tool.style.y} || {}}
      key={index}
      id={index}
      draggable={
        lesson && lesson.meta.type === "c2m" ? false : tool.isQuestion && true
      }
      onDrop={(e) =>
        (tool.isAns && onDrop(e, tool, draggedQuestion, lessonId)) || undefined
      }
      onDragEnd={tool.isQuestion && onDragEnd}
      onDragOver={(tool.isAns && onDragOver) || undefined}
      onDrag={(tool.isQuestion && onDrag) || undefined}
      onDragStart={(e) =>
        (tool.isQuestion && onDragStart(e, tool, setDraggedQuestion)) ||
        undefined
      }
      onClick={(e) =>
        (lesson &&
          lesson.meta.type === "c2m" &&
          tool.isQuestion &&
          onClickMatch({ q: true, rightAnsIndexs: tool.rightAnsIndexs })) ||
        (lesson &&
          lesson.meta.type === "c2m" &&
          tool.isAns &&
          onClickMatch({
            a: true,
            questionIndex: tool.questionIndex,
            index: tool.index,
          })) ||
        {}
      }
      // onDrag={(e, data) => handleDrag(e, data, tool)}
      // onStop={(e, data) => handleDrop(dispatch,e, data, tool,tools)}
    >
      <div>
        <RenderToolDelegator playAudio={playAudio} tool={tool} />
      </div>
    </div>
  ));
}

export function useDragging() {
  const { state, dispatch } = useContext(STUDENT_LESSON_STATE);
  const { data } = state;
  return { ...data, dispatch };
}

function RenderIcon({ tool, playAudio }) {
  return (
    <div
      onClick={() => playAudio(tool.audioFile)}
      className={` added-tool${tool.index} `}
      id={`added-tool${tool.index}`}
    >
      {/* <i className="material-icons" style={tool.style}>{tool.name}</i> */}
      <i
        className="material-icons"
        style={(tool.style && { ...tool.style }) || tool.style}
      >
        {tool.name}{" "}
      </i>
    </div>
  );
}

function RenderText({ tool, playAudio }) {
  return (
    <div
      onClick={() => playAudio(tool.audioFile)}
      className={`  added-tool${tool.index} `}
      id={`added-tool${tool.index}`}
    >
      <i className="l-tool-text " style={{padding:'8px', ...tool.style, width: "200px" }}>
        <code>{tool.text}</code>
      </i>
    </div>
  );
}

function RenderLine({ tool, playAudio }) {
  return (
    <div
      onClick={() => playAudio(tool.audioFile)}
      className={`  added-tool${tool.index} `}
      id={`added-tool${tool.index}`}
    >
      {/* <i className="l-tool-text" style={tool.style}>{tool.text}</i> */}
      <i
        className="material-icons"
        style={{textAlign:'center',  width: "100px", height: "10px", ...tool.style }}
      >
        <hr style={{ width: "inherit", height: "inherit" }} />
      </i>
    </div>
  );
}

function RenderImage({ tool, playAudio }) {
  const position = (tool.style && {}) || {};
  return (
    //...tool.style
    <div
      onClick={() => playAudio(tool.audioFile)}
      className={` added-tool${tool.index} `}
      id={`added-tool${tool.index}`}
    >
      <i
        className="material-icons"
        style={{ width: "100px", height: "100px", ...tool.style }}
      >
        <img
          className=""
          src={`${getFileUrl({ fileName: tool.path })}`}
          style={{ width: "inherit", height: "inherit" }}
        />
      </i>
    </div>
  );
}

function RenderToolDelegator({ tool, playAudio }) {
  const COMPONENTS = {
    icon: RenderIcon,
    text: RenderText,
    image: RenderImage,
    line: RenderLine,
  };
  const Tool = COMPONENTS[tool.type];
  // tool = tool.style && { ...tool, style: { ...tool.style, left: tool.style.x, top: tool.style.y}} || tool;

  return (Tool && <Tool playAudio={playAudio} tool={tool} />) || null;
}
export default MainScreen;
