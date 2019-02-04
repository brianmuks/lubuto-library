import React, { useContext } from "react";
import { TOOLS_STATE } from "./../d-context";
import { editTool, editStaggedTools } from "./../d-redux/actions/lessonActions";

function StagedTools() {
  const { state, dispatch } = useContext(TOOLS_STATE);
  const tools = state.staggedTools;

  return (
    <div className="  staged-resource staged-editor">
      <ul className="collection with-header">
        <li className="collection-header ">
          <h6>STAGGED</h6>
        </li>

        <RenderStaggedTools tools={tools} dispatch={dispatch} />
      </ul>
    </div>
  );
}

function RenderStaggedTools({ tools, dispatch }) {


  
  
  
  const highlight = ({ editTool, _tools, ishighlight=false}) =>{
    const elem = document.getElementById(`added-tool${editTool.index}`)
    ishighlight && $(elem).addClass('stagged-tool-highlight')
      || $(elem).removeClass('stagged-tool-highlight');
  }


  return tools.map((tool, key) => (
    <li
      key={key}
      onMouseOver={() => highlight({ editTool: tool, _tools: tools, ishighlight:true})}
      onMouseOut={() => highlight({ editTool:tool, _tools:tools})}
      className="collection-item"
      onClick={() => {
        dispatch(editTool(tool));
      }}
    >
      <div>
        {tool.label}
        <a href="#!" 
          data-tooltip="I am a tooltip"
          data-position="bottom"
        className="secondary-content tooltipped">
          <i className="material-icons">{tool.name}</i>
          <i
            className="material-icons red-text right"
            onClick={() => alert("You will be able to remove tool at will")}
          >
            {" "}
            clear
          </i>
        </a>
      </div>
    </li>
  ));
}

export default StagedTools;
