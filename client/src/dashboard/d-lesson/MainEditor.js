import React, { useContext, useState } from "react";
//import { useDragging } from "./ResourceEditor";
import { TOOLS_STATE } from "./../d-context";
import Draggable from "react-draggable";
import { editStaggedTools, editTool } from "../d-redux/actions/lessonActions";
import { AUDIO_URL, IMAGE_EXTERNAL_URL } from "../../utilities/constants";
import { editLesson, playAudio } from "../../student/s-lesson/methods";
import { unDo } from "./methods";
import { getFileUrl } from "../../utilities/Tasks";
import  Tooltip from "antd/lib/tooltip";
const LANG = 'kao';  

function MainEditor(props) {
  const [audioFile, setAudioFile] = useState([]);
  const [editedTools, add2EditedTools] = useState([]);

  const { state, dispatch } = useContext(TOOLS_STATE);
  const { staggedTools, color, bgColor, size, spacing } = state;
  const { x, y, node, _id, name } = useDragging();
  
  document.onkeydown = e=>unDo({e,dispatch})

  return (
    // col m7 offset - m3
    <div
     className=" grey lighten-3 editor">

      <audio  src={'http://127.0.0.1:4000/1_Kiikaonde/ESAKANYA_BISOPLOKATA_NE_BICHE_BYA_MAFUMU.wav'}   id="audio" >
        {/* <source   type="audio/wav" /> */}
      </audio>
      Main Editor <br />
      <RenderTools  
      
      onEditTool={props.setToolEditorVisibility}
      dispatch={dispatch} add2EditedTools={add2EditedTools} editedTools={editedTools} playAudio={playAudio} isPreview={props.isPreview && true || false} tools={staggedTools} color={color} bgColor={bgColor}/>
    </div>
  );
}

function handleDrag(e, data, tool, editedTools, add2EditedTools) {
  //  dispatch({ type: "DRAG", data: pos });
  add2EditedTools([...editedTools, tool.index]);
}

function handleDrop(dispatch, e, pos, tool, tools, add2EditedTools, editedTools) {

  // NOTE: each time an elem is drgged, a new tool gets added to
  // staggedTools. This should not be the case.
  //
  //dispatch({ type: "DROP", tool:{pos,tool} });

  // tools = tools.filter(i => i.index !== tool.index);

  console.log(pos.x, pos.y, 'Image position');


  tools =tools.map(i=>(
    i.index == tool.index && { ...tool, style: { ...tool.style, position: 'absolute', x: pos.x, y: pos.y } } || i
  ))

  // tools = [...tools, { ...tool, style: { ...tool.style, position: 'absolute',x:pos.x,y:pos.y}}]
  dispatch(editStaggedTools(tools));
  console.log(tools);
}

function RenderTools({ tools, editedTools, add2EditedTools,dispatch,onEditTool}) {

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
        style={
          (tool.style &&
            editedTools.indexOf(tool.index) === -1 && {
              position: "absolute",
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


function RenderIcon({tool}){
  return(
    <div onClick={() => playAudio(tool.audioFile)} className={`  added-tool${tool.index} `} id={`added-tool${tool.index}`}>
      <i className="material-icons" style={tool.style}>{tool.name}</i>
    </div>
  )
}

function RenderText({tool}){

  return (
    <div onClick={() => playAudio(tool.audioFile)} className={`  added-tool${tool.index} `} id={`added-tool${tool.index}`}>
      <i className="l-tool-text" style={tool.style}><code>{tool.text}</code></i>
    </div>
  )

}

function RenderImage({ tool }) {
  return (
    //...tool.style
    <div onClick={() => playAudio(tool.audioFile)} className={`  added-tool${tool.index} `} id={`added-tool${tool.index}`}>
        {/* <img className="l-img-tool material-icons" style={tool.style} src={`${IMAGE_EXTERNAL_URL}/${tool.path}`}   /> */}
      {/* <div className="material-icons l-img-tool" style={ {width:'100px',height:'100px', backgroundImage: `url(${IMAGE_EXTERNAL_URL}/${tool.path})` }}>
      </div> */}

      <i className="material-icons" style={{width:'100px',height:'100px',...tool.style}}>
      <img className=""  src={`${getFileUrl({fileName:tool.path})}`} style={{width:'inherit',height:'inherit'}} />
      </i>
    </div>
  )
}

function RenderLine({ tool }) {
  return (
    <div onClick={() => playAudio(tool.audioFile)} className={`  added-tool${tool.index} `} id={`added-tool${tool.index}`}>
      {/* <i className="l-tool-text" style={tool.style}>{tool.text}</i> */}
      <i className="material-icons" style={{ width: '100px', height: '1px', ...tool.style }}>
        <hr style={{ width: 'inherit', height: 'inherit' }} />
      </i>
    </div>
  )
}

export function RenderToolDelegator({tool,editedTools,dispatch,onEditTool,isRender=true}){
      const COMPONENTS = {
        icon:RenderIcon,
        text:RenderText,
        image:RenderImage,
        line: RenderLine
      }
   const Tool =  COMPONENTS[tool.type];

      if(!isRender){
        console.log("RenderToolDelegator():tool",tool);
        return Tool ? <Tool tool={tool} /> : <span>TOOL NOT FOUND! </span>;
      }

  // tool = tool.style && { ...tool, style: { ...tool.style, position: 'absolute' } } || { ...tool, style: { position: 'absolute'}};
  // the tool being returned wasn't recognized as a component
  return (
    (Tool && (
      <ToolWrapper onEditTool={onEditTool} dispatch={dispatch} tool={tool}>
        <Tool tool={tool} />
      </ToolWrapper>
    )) || <span />
  );
  //this not working for me. Nothing is shwoing [I will have to explain]
  return <div {...Tool} tool={tool} />

}

export function useDragging(){
  const {state, dispatch} = useContext(TOOLS_STATE);
  const { data } = state;
  return { ...data, dispatch }
}

const ToolWrapper = ({ children, tool, dispatch, onEditTool }) => {
  const _editTool = () => {
    dispatch(editTool(tool));
    onEditTool && onEditTool(true);
  };

  return (
    <React.Fragment>
      <Tooltip placement="topLeft" title={"Edit"} onClick={_editTool}>
        <span>...</span>
      </Tooltip>
      {children}
    </React.Fragment>
  );
};





export default MainEditor;