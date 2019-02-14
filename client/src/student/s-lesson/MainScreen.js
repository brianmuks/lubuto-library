import React, { useContext, useState } from "react";
//import { useDragging } from "./ResourceEditor";
import { TOOLS_STATE } from "./../s-context";
import Draggable from "react-draggable";
import { editStaggedTools } from "../s-redux/actions/lessonActions";
import { AUDIO_URL, IMAGE_EXTERNAL_URL } from "../../utilities/constants";
const LANG = '1_Kiikaonde';  


function MainScreen(props) {
  const [audioFile, setAudioFile] = useState([])

  const { state } = useContext(TOOLS_STATE);
  const { staggedTools, color, bgColor, size, spacing } = state;
  const { x, y, node, _id, name } = useDragging();

  function playAudio(audioFile){

            if (!audioFile) {
            return  
            }

        var audio = document.getElementById("audio");
        const src =AUDIO_URL+LANG+'/'+audioFile;
        audio.src = src;
        audio.play()
}

  return (
    // col m7 offset - m3
    <>
      <audio  src={'http://127.0.0.1:4000/1_Kiikaonde/ESAKANYA_BISOPLOKATA_NE_BICHE_BYA_MAFUMU.wav'}   id="audio" >
        {/* <source   type="audio/wav" /> */}
      </audio>
    <div className=" grey lighten-3 main-screen-4-lesson">
      <RenderTools playAudio={playAudio} isPreview={props.isPreview && true || false} tools={staggedTools} color={color} bgColor={bgColor}/>
    </div>
    </>
  );
}

function handleDrag(e, pos, icon) {
  //  dispatch({ type: "DRAG", data: pos });
}

function handleDrop(dispatch,e, pos, tool, tools) {
  console.log(
    'X:',pos.x,
    'Y:',pos.y,
    '_X:',tool.style.x,
    '_Y:',tool.style.y,
  );
  // NOTE: each time an elem is drgged, a new tool gets added to
  // staggedTools. This should not be the case.
  //
  //dispatch({ type: "DROP", tool:{pos,tool} });

  // tools = tools.filter(i => i.index !== tool.index);

  tools =tools.map(i=>(
    i.index == tool.index && { ...tool, style: { ...tool.style, x: tool.x, y: tool.y } } || i
  ))

  // tools = [...tools, { ...tool, style: { ...tool.style, position: 'absolute',x:pos.x,y:pos.y}}]
  //dispatch(editStaggedTools(tools));
  // console.log(tools);
}

function RenderTools({playAudio, isPreview, tools, color='' , bgColor=''}) {
  const { state, dispatch } = useContext(TOOLS_STATE);

  const onDragOver = (ev)=>{
    ev.preventDefault();

    console.log('ondragover');
  }
  const onDrop = (ev,tool)=>{
    ev.preventDefault();
    let left = parseInt(tool.style.width.replace('px', ''));
    diff = 15 / 100 * left;

    left = left/2-diff;
    const data = ev.dataTransfer.getData("text");
    let draggedItem = document.getElementById(data);

    draggedItem.style = `bottom:100px;position:absolute;left:${left}px`

    ev.target.appendChild(draggedItem);

    console.log('ondrop',left,diff);
  }

  const onDrag = (ev) => {

    console.log('onDrag');
  }
  const onDragStart = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);

    console.log('onDrag');
  }


  return tools.map((tool, index) => (
    // marginLeft: tool.style.x, marginTop: tool.style.y
    <div 
      className={tool.type === 'line' && `tool-line` || ``} 
      style= {tool.style && {  position:'absolute', left: tool.style.x, top: tool.style.y  } ||{}}
      // position={tool.style && { x: tool.style.x, y: tool.style.y} || {}}
      key={index}
      id={index}
      draggable={tool.type !== 'line' && true}
      onDrop={e => tool.type === 'line' && onDrop(e,tool) || undefined} 
      onDragOver={tool.type === 'line' && onDragOver || undefined} 
      onDrag={tool.type !== 'line' && onDrag || undefined}
      onDragStart={tool.type !== 'line' && onDragStart || undefined}
    
      // onDrag={(e, data) => handleDrag(e, data, tool)}
      // onStop={(e, data) => handleDrop(dispatch,e, data, tool,tools)}
    >
      <div 
     
      >
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
      <i className="material-icons" style={{ width: '100px', height: '1px', ...tool.style }}>
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
