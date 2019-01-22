import React, { useContext, useEffect, useState } from "react";
//import { useDragging } from "./ResourceEditor";
import { TOOLS_STATE } from "../d-context";
import Draggable from "react-draggable";
import { editStaggedTools, addTool } from "../d-redux/actions/lessonActions";
import { COL_Lessons } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";

function LessonPreview(props) {

  const { state, dispatch} = useContext(TOOLS_STATE);
  const [tools, setTools] = useState([]);


    useEffect(()=>{

      if (!props.lesson) {
        return
      }
      let x =  (props.lesson);
      var result = Object.keys(x).map(function (key) {
        return x[key];
      });
      setTools(result)
      console.log(result);
      // dispatch(editStaggedTools(result));
    },[props.lesson]);



  // const { state } = useContext(TOOLS_STATE);
  const { staggedTools, color, bgColor, size, spacing } = state || {};
  const { x, y, node, _id, name } = useDragging();
  return (
    <div className="col m7 offset-m3 grey lighten-3 editor">
      MAIN EDITOR <br />
      <RenderTools tools={tools} color={color} bgColor={bgColor}/>
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

  tools = tools.filter(i => i.index !== tool.index);

  tools = [...tools, { ...tool, style: { ...tool.style, position: 'absolute',x:pos.x,y:pos.y}}]

  dispatch(editStaggedTools(tools))

  console.log(tools);

}

function RenderTools({ tools, color='' , bgColor=''}) {
  const { state, dispatch } = useContext(TOOLS_STATE);

  return tools.map((tool, index) => (
    <Draggable
      key={index}
      onDrag={(e, data) => handleDrag(e, data, tool)}
      onStop={(e, data) => handleDrop(dispatch,e, data, tool,tools)}
    >
      <div className={` col m1 added-tool${tool.index} `} id={`added-tool${tool.index}`}>
        <i className="material-icons" style={tool.style && { ...tool.style, left: tool.style.x, top: tool.style.y}}>{tool.name}</i>
      </div>
    </Draggable>
  ));
}

export function useDragging(){
  const {state, dispatch} = useContext(TOOLS_STATE);
  const { data } = state || {};
  return { ...data, dispatch }
}




export default withTracker(() => {
  Meteor.subscribe("lessons");
  Meteor.subscribe("users");
  return {
    lesson: COL_Lessons.findOne()
  };
})(LessonPreview);