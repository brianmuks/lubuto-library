import React, { useContext, useState } from "react";
//import { useDragging } from "./ResourceEditor";
import { TOOLS_STATE } from "./../s-context";
import Draggable from "react-draggable";
import { editStaggedTools } from "../s-redux/actions/lessonActions";
import { AUDIO_URL } from "../../utilities/constants";
const LANG = "1_Kiikaonde";

function MainScreen(props) {
  const [audioFile, setAudioFile] = useState([]);

  const { state } = useContext(TOOLS_STATE);
  const { staggedTools, color, bgColor, size, spacing } = state;
  const { x, y, node, _id, name } = useDragging();

  function playAudio(audioFile) {
    if (!audioFile) {
      return;
    }

    var audio = document.getElementById("audio");
    const src = AUDIO_URL + LANG + "/" + audioFile;
    audio.src = src;
    audio.play();
  }
  console.log();
  return (
    // col m7 offset - m3
    <div className=" grey lighten-3 main-screen-4-lesson">
      <audio
        src={
          "http://127.0.0.1:4000/1_Kiikaonde/ESAKANYA_BISOPLOKATA_NE_BICHE_BYA_MAFUMU.wav"
        }
        id="audio"
      >
        {/* <source   type="audio/wav" /> */}
      </audio>
      MAIN EDITOR <br />
      <RenderTools
        playAudio={playAudio}
        isPreview={(props.isPreview && true) || false}
        tools={staggedTools}
        color={color}
        bgColor={bgColor}
      />
      <span>{color}</span> <br />
      <span>{size}</span> <br />
      <span>{spacing}</span> <br />
      <span>{bgColor}</span>
    </div>
  );
}

function handleDrag(e, pos, icon) {
  //  dispatch({ type: "DRAG", data: pos });
}

function handleDrop(dispatch, e, pos, tool, tools) {
  // NOTE: each time an elem is drgged, a new tool gets added to
  // staggedTools. This should not be the case.
  //
  //dispatch({ type: "DROP", tool:{pos,tool} });

  // tools = tools.filter(i => i.index !== tool.index);

  tools = tools.map(
    i =>
      (i.index == tool.index && {
        ...tool,
        style: { ...tool.style, position: "absolute", x: pos.x, y: pos.y }
      }) ||
      i
  );

  // tools = [...tools, { ...tool, style: { ...tool.style, position: 'absolute',x:pos.x,y:pos.y}}]
  dispatch(editStaggedTools(tools));

  console.log(tools);
}

function RenderTools({
  playAudio,
  isPreview,
  tools,
  color = "",
  bgColor = ""
}) {
  const { state, dispatch } = useContext(TOOLS_STATE);

  return tools.map((tool, index) => (
    <div
      draggable
      key={index}
      onDrag={(e, data) => handleDrag(e, data, tool)}
      onDrop={(e, data) => handleDrop(dispatch, e, data, tool, tools)}
    >
      <div
        onClick={() => playAudio(tool.audioFile)}
        className={` col m1 added-tool${tool.index} `}
        id={`added-tool${tool.index}`}
      >
        <i
          className="material-icons"
          style={
            (tool.style &&
              isPreview && {
                ...tool.style,
                marginLeft: tool.style.x,
                marginTop: tool.style.y
              }) ||
            tool.style
          }
        >
          {tool.name}
        </i>
      </div>
    </div>
  ));
}

export function useDragging() {
  const { state, dispatch } = useContext(TOOLS_STATE);
  const { data } = state;
  return { ...data, dispatch };
}

export default MainScreen;
