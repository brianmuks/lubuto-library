import React, { useContext, useState } from "react";
//import { useDragging } from "./ResourceEditor";
import { TOOLS_STATE } from "./../d-context";
import Draggable from "react-draggable";
import { editStaggedTools } from "../d-redux/actions/lessonActions";
import { AUDIO_URL, IMAGE_EXTERNAL_URL } from "../../utilities/constants";
const LANG = 'kao';  

function MainEditor(props) {
  const [audioFile, setAudioFile] = useState([])

  const { state } = useContext(TOOLS_STATE);
  const { staggedTools, color, bgColor, size, spacing } = state;
  const { x, y, node, _id, name } = useDragging();

  return (
    // col m7 offset - m3
    <div className=" grey lighten-3 editor">

      <audio  src={'http://127.0.0.1:4000/1_Kiikaonde/ESAKANYA_BISOPLOKATA_NE_BICHE_BYA_MAFUMU.wav'}   id="audio" >
        {/* <source   type="audio/wav" /> */}

      </audio>
      MAIN EDITOR <br />
      <RenderTools playAudio={playAudio} isPreview={props.isPreview && true || false} tools={staggedTools} color={color} bgColor={bgColor}/>
      <span>{color}</span> <br />
      <span>{size}</span>  <br />
      <span>{spacing}</span> <br />
      <span>{bgColor}</span>
    </div>
  );
}

function handleDrag(e, pos, icon) {
  //  dispatch({ type: "DRAG", data: pos });
}

function handleDrop(dispatch,e, pos, tool, tools) {


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

function RenderTools({playAudio, isPreview, tools, color='' , bgColor=''}) {
  const { state, dispatch } = useContext(TOOLS_STATE);

  return tools.map((tool, index) => (
    <Draggable
      key={index}
      onDrag={(e, data) => handleDrag(e, data, tool)}
      onStop={(e, data) => handleDrop(dispatch,e, data, tool,tools)}
    >
    <div >
        <RenderToolDelegator tool={tool}  />
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
      <i className="l-tool-text" style={tool.style}>{tool.text}</i>
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
      <img className=""  src={`${IMAGE_EXTERNAL_URL}/${tool.path}`} style={{width:'inherit',height:'inherit'}} />
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

function RenderToolDelegator({tool}){
      const COMPONENTS = {
        icon:RenderIcon,
        text:RenderText,
        image:RenderImage,
        line: RenderLine
      }
   const Tool =  COMPONENTS[tool.type];
  // tool = tool.style && { ...tool, style: { ...tool.style, position: 'absolute' } } || { ...tool, style: { position: 'absolute'}};
  // the tool being returned wasn't recognized as a component
  return Tool && <Tool tool={tool} /> || <span/>
  //this not working for me. Nothing is shwoing [I will have to explain]
  return <div {...Tool} tool={tool} />

}


function playAudio(audioFile) {

  if (!audioFile) {
    return
  }

  var audio = document.getElementById("audio");
  const src = AUDIO_URL + LANG + '/' + audioFile;
  audio.src = src;
  audio.play()
}

export function useDragging(){
  const {state, dispatch} = useContext(TOOLS_STATE);
  const { data } = state;
  return { ...data, dispatch }
}

export default MainEditor;
