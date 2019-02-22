import React, { useContext, useState } from "react";
//import { useDragging } from "./ResourceEditor";
import { TOOLS_STATE } from "./../s-context";
import Draggable from "react-draggable";
import { editStaggedTools } from "../s-redux/actions/lessonActions";
import { AUDIO_URL, IMAGE_EXTERNAL_URL } from "../../utilities/constants";
import { onDrop,playAudio,onDragOver,onDrag,onDragStart } from "./methods";
const LANG = 'kao';  

function MainScreen(props) {
  const [audioFile, setAudioFile] = useState([])

  const { state } = useContext(TOOLS_STATE);
  const { staggedTools, color, bgColor, size, spacing } = state;
  const { x, y, node, _id, name } = useDragging();

  const [draggedQuestion, setDraggedQuestion] = useState(null)

  return (
    // col m7 offset - m3
    <>
      <audio  src={'http://127.0.0.1:4000/audio/kao/n.wav'}   id="audio" >
        {/* <source   type="audio/wav" /> */}
      </audio>
    <div className=" grey lighten-3 main-screen-4-lesson">
      <RenderTools draggedQuestion={draggedQuestion} setDraggedQuestion={setDraggedQuestion} playAudio={playAudio} isPreview={props.isPreview && true || false} tools={staggedTools} color={color} bgColor={bgColor}/>
    </div>
    </>
  );
}


function RenderTools({playAudio, setDraggedQuestion,draggedQuestion, tools}) {
  const { state, dispatch } = useContext(TOOLS_STATE);

  return tools.map((tool, index) => (
    // marginLeft: tool.style.x, marginTop: tool.style.y
    <div 
      style= {tool.style && {  position:'absolute', left: tool.style.x, top: tool.style.y  } ||{}}
      // position={tool.style && { x: tool.style.x, y: tool.style.y} || {}}
      key={index}
      id={index}
      draggable={tool.isQuestion  && true}
      onDrop={e => tool.isAns  && onDrop(e,tool,draggedQuestion) || undefined} 
      onDragOver={tool.isAns  && onDragOver || undefined} 
      onDrag={tool.isQuestion  && onDrag || undefined}
      onDragStart={e => tool.isQuestion && onDragStart(e, tool,setDraggedQuestion) || undefined}
    
      // onDrag={(e, data) => handleDrag(e, data, tool)}
      // onStop={(e, data) => handleDrop(dispatch,e, data, tool,tools)}
    >
      <div> 
        <RenderToolDelegator playAudio={playAudio} tool={tool} />
      </div>
    </div>
  ));
}

export function useDragging(){
  const {state, dispatch} = useContext(TOOLS_STATE);
  const { data } = state;
  return { ...data, dispatch }
}

function RenderIcon({ tool, playAudio }) {
  return (
    <div   onClick={() => playAudio(tool.audioFile)} className={`tool added-tool${tool.index} `} id={`added-tool${tool.index}`}>
      {/* <i className="material-icons" style={tool.style}>{tool.name}</i> */}
      <i className="material-icons" style={tool.style && { ...tool.style,  } || tool.style}>{tool.name}      </i>
    </div>
  )
}


function RenderText({ tool, playAudio }) {

  return (
    <div onClick={() => playAudio(tool.audioFile)} className={` added-tool${tool.index} `} id={`added-tool${tool.index}`}>
      {/* <i className="l-tool-text" style={tool.style}>{tool.text}</i> */}
      <i className="material-icons" style={tool.style && { ...tool.style,  } || tool.style}>{tool.text}</i>
    </div>
  )

}

function RenderLine({ tool, playAudio }) {
  return (
    <div onClick={() => playAudio(tool.audioFile)} className={`  added-tool${tool.index} `} id={`added-tool${tool.index}`}>
      {/* <i className="l-tool-text" style={tool.style}>{tool.text}</i> */}
      <i className="material-icons" style={{ width: '100px', height: '10px', ...tool.style }}>
        <hr style={{ width: 'inherit', height: 'inherit' }} />
      </i>
    </div>
  )
}


//

function RenderImage({ tool, playAudio }) {
  const position = tool.style && { } || {};
  return (
    //...tool.style
    <div onClick={() => playAudio(tool.audioFile)} className={` added-tool${tool.index} `} id={`added-tool${tool.index}`}>
        <i className="material-icons" style={{width:'100px',height:'100px',...tool.style,}}>
      <img className=""  src={`${IMAGE_EXTERNAL_URL}/${tool.path}`} style={{width:'inherit',height:'inherit'}} />
      </i>

    </div>
  )
}

function RenderToolDelegator ({ tool, playAudio }) {
  const COMPONENTS = {
    icon: RenderIcon,
    text: RenderText,
    image: RenderImage,
    line: RenderLine
  }
  const Tool = COMPONENTS[tool.type];
  // tool = tool.style && { ...tool, style: { ...tool.style, left: tool.style.x, top: tool.style.y}} || tool;
      
  return Tool && <Tool   playAudio={playAudio} tool={tool} /> || null
}


export default MainScreen;
