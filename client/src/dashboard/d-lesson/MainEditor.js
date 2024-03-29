import React, { useContext, useState } from "react";
//import { useDragging } from "./ResourceEditor";
import { TOOLS_STATE } from "./../d-context";
import Draggable from "react-draggable";
import { editStaggedTools, editTool } from "../d-redux/actions/lessonActions";
import { AUDIO_URL, IMAGE_EXTERNAL_URL } from "../../utilities/constants";
import { editLesson, playAudio } from "../../student/s-lesson/methods";
import { unDo, __editTool } from "./methods";
import { getFileUrl } from "../../utilities/Tasks";
import Tooltip from "antd/lib/tooltip";
const LANG = "kao";

function MainEditor(props) {
  const [audioFile, setAudioFile] = useState([]);
  const [editedTools, add2EditedTools] = useState([]);

  const { state, dispatch } = useContext(TOOLS_STATE);
  const { staggedTools, color, bgColor, size, spacing } = state;
  const { x, y, node, _id, name } = useDragging();

  document.onkeydown = (e) => unDo({ e, dispatch });

  return (
    // col m7 offset - m3
    <div className=" grey lighten-3 editor">
      <audio
        src={
          "http://127.0.0.1:4000/1_Kiikaonde/ESAKANYA_BISOPLOKATA_NE_BICHE_BYA_MAFUMU.wav"
        }
        id="audio"
      >
        {/* <source   type="audio/wav" /> */}
      </audio>
      Main Editor <br />
      <RenderTools
        onEditTool={props.setToolEditorVisibility}
        dispatch={dispatch}
        add2EditedTools={add2EditedTools}
        editedTools={editedTools}
        playAudio={playAudio}
        isPreview={(props.isPreview && true) || false}
        tools={staggedTools}
        color={color}
        bgColor={bgColor}
      />
    </div>
  );
}

function handleDrag(e, data, tool, editedTools, add2EditedTools) {
  //  dispatch({ type: "DRAG", data: pos });
  add2EditedTools([...editedTools, tool.index]);
}

function handleDrop(
  dispatch,
  e,
  pos,
  tool,
  tools,
  add2EditedTools,
  editedTools
) {
  // NOTE: each time an elem is drgged, a new tool gets added to
  // staggedTools. This should not be the case.
  //
  //dispatch({ type: "DROP", tool:{pos,tool} });

  // tools = tools.filter(i => i.index !== tool.index);


  tools = tools.map(
    (i) =>
      (i.index == tool.index && {
        ...tool,
        style: { ...tool.style, position: "absolute", x: pos.x, y: pos.y },
      }) ||
      i
  );

  // tools = [...tools, { ...tool, style: { ...tool.style, position: 'absolute',x:pos.x,y:pos.y}}]
  dispatch(editStaggedTools(tools));
}

function RenderTools({
  tools,
  editedTools,
  add2EditedTools,
  dispatch,
  onEditTool,
}) {
  const onContextMenu = ({ tool, e }) => {
    e.preventDefault();
    __editTool({ onEditTool, dispatch, tool });
  };

  return tools.map((tool, index) => (
    <Draggable
      key={index}
      onDrag={(e, data) =>
        handleDrag(e, data, tool, editedTools, add2EditedTools)
      }
      onStop={(e, data) =>
        handleDrop(dispatch, e, data, tool, tools, add2EditedTools, editedTools)
      }
    >
      <div
        onContextMenu={(e) => onContextMenu({ tool, e })}
        style={
          (tool.style &&
            editedTools.indexOf(tool.index) === -1 && {
              position: "absolute",
              backgroundColor: "red",
              left: tool.style.x,
              top: tool.style.y + 20,
            }) ||
          {}
        }
      >
        <RenderToolDelegator
          dispatch={dispatch}
          tool={tool}
          onEditTool={onEditTool}
        />
      </div>
    </Draggable>
  ));
}

function RenderIcon({ tool, onEditTool, dispatch }) {
  return (
    <div
      onClick={() => playAudio(tool.audioFile)}
      className={`  added-tool${tool.index} `}
      id={`added-tool${tool.index}`}
    >
      <i className="material-icons" style={tool.style}>
        {tool.name}
      </i>
    </div>
  );
}

function RenderText({ tool, onEditTool, dispatch }) {
  const wordWrap = {
    // "white-space": " -moz-pre-wrap !important" /* Mozilla, since 1999 */,
    // "white-space": "-pre-wrap" /* Opera 4-6 */,
    // "white-space": " -o-pre-wrap" /* Opera 7 */,
    // "white-space": " pre-wrap" /* css-3 */,
    // "word-wrap": " break-word" /* Internet Explorer 5.5+ */,
    "white-space": "nowrap" /* Newer versions of Chrome/Safari*/,
    // "word-break": " break-all",
    // "white-space": "normal",
  };

  return (
    <div
      onClick={() => playAudio(tool.audioFile)}
      className={`added-tool${tool.index} `}
      id={`added-tool${tool.index}`}
    >
      <i className="l-tool-text" style={{ ...tool.style }}>
        <code>{tool.text}</code>
      </i>
    </div>
  );
}

function RenderImage({ tool, onEditTool, dispatch }) {
  return (
    //...tool.style
    <div
      onClick={() => playAudio(tool.audioFile)}
      className={`added-tool${tool.index} `}
      id={`added-tool${tool.index}`}
    >
      {/* <img className="l-img-tool material-icons" style={tool.style} src={`${IMAGE_EXTERNAL_URL}/${tool.path}`}   /> */}
      {/* <div className="material-icons l-img-tool" style={ {width:'100px',height:'100px', backgroundImage: `url(${IMAGE_EXTERNAL_URL}/${tool.path})` }}>
      </div> */}

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

function RenderLine({ tool, onEditTool, dispatch }) {
  return (
    <div
      onClick={() => playAudio(tool.audioFile)}
      className={`  added-tool${tool.index} `}
      id={`added-tool${tool.index}`}
      style={{ backgroundColor: "red" }}
    >
      {/* <i className="l-tool-text" style={tool.style}>{tool.text}</i> */}
      <i
        className="material-icons"
        style={{ width: "100px", height: "1px", ...tool.style }}
      >
        <hr style={{ width: "inherit", height: "inherit" }} />
      </i>
    </div>
  );
}

export function RenderToolDelegator({
  tool,
  editedTools,
  dispatch,
  onEditTool,
  isRender = true,
}) {
  const COMPONENTS = {
    icon: RenderIcon,
    text: RenderText,
    image: RenderImage,
    line: RenderLine,
  };
  const Tool = COMPONENTS[tool.type];

  if (!isRender) {
    return Tool ? <Tool tool={tool} /> : <span>TOOL NOT FOUND! </span>;
  }

  // tool = tool.style && { ...tool, style: { ...tool.style, position: 'absolute' } } || { ...tool, style: { position: 'absolute'}};
  // the tool being returned wasn't recognized as a component
  return (
    (Tool && (
      <ToolWrapper dispatch={dispatch} tool={tool}>
        <Tool tool={tool} onEditTool={onEditTool} dispatch={dispatch} />
      </ToolWrapper>
    )) || <span />
  );
  //this not working for me. Nothing is shwoing [I will have to explain]
  return <div {...Tool} tool={tool} />;
}

export function useDragging() {
  const { state, dispatch } = useContext(TOOLS_STATE);
  const { data } = state;
  return { ...data, dispatch };
}

const ToolWrapper = ({ children, tool, dispatch, onEditTool }) => {
  return <React.Fragment>{children}</React.Fragment>;
};

export default MainEditor;
