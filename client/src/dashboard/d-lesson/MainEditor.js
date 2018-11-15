import React,{useContext} from "react";
import { useDragging } from './ResourceEditor'
import {TOOLS_STATE} from './../d-context';
import Draggable from "react-draggable";


function MainEditor() {

  const {state} = useContext(TOOLS_STATE);
  const {staggedTools} = state;

    const { x, y, node, _id, name } = useDragging()
  return (
  <div className="col m7 offset-m3 grey lighten-3 editor">
     MAIN EDITOR <br />
    <RenderTools tools={staggedTools}/>
  </div>
  )
}

function RenderTools({tools}){

  return tools.map((tool,index) => (
    <Draggable key={index} 
    onDrag={ (e, data) =>  handleDrag(e, data, tool)}
    onStop={(e, data) =>  handleDrop(e, data, tool)}
  >
    <div className={tool.css || 'col s1'} styl={tool.style }>
    <i className="material-icons">{tool.name}</i>
    
    </div>
    </Draggable>

  ))


}

export default MainEditor;
