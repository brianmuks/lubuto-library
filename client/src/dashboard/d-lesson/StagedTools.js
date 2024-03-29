import React, { useContext, useState } from "react";
import { TOOLS_STATE } from "./../d-context";
import { editTool, editStaggedTools } from "./../d-redux/actions/lessonActions";
import StagedToolsLabelEditor, { STAGGED_TOOLS_MODAL_ID} from "./StagedToolsLabelEditor";
import { intiToolTip } from "../../utilities/Form";
import RemoveToolModal, { REMOVE_TOOL_MODAL_ID } from "./RemoveToolModal";

function StagedTools() {
  intiToolTip();
  const { state, dispatch } = useContext(TOOLS_STATE);
  const [label, setLabel] = useState(null);
  const [toolIndex, setToolIndex] = useState(null);

  const tools = state.staggedTools;

  const removeTool = () => {
    //toolIndex IS SET ON EVERY tool hover
    const _tools = tools.filter(i => (
      toolIndex !== i.index
    ))
    dispatch(editStaggedTools(_tools));
  }



  const editToolLable = (toolIndex,label) => {

    // FIXME: THIS FUNCTION CAUSESS < StagedToolsLabelEditor> TO RE-RENDER


    setToolIndex(toolIndex);
      setLabel(label);
    // $('#' + STAGGED_TOOLS_MODAL_TRIGGER_ID).trigger('click');
    return true;
  }

  return (
    <div>
      <StagedToolsLabelEditor toolIndex={toolIndex} oldLabel={label} />
   
      <div className="  staged-resource staged-editor">
        <ul className="collection with-header">
          <li className="collection-header ">
            <h6>STAGGED </h6>
          </li>
          <RenderStaggedTools
            editToolLable={editToolLable}
            tools={tools}
            dispatch={dispatch}
          />
        </ul>
      </div>
    </div>
  );
}

function RenderStaggedTools({ tools, dispatch,editToolLable }) {
  const highlight = ({ editTool, _tools, ishighlight=false}) =>{

    editToolLable(editTool.index, editTool.label);

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
    >
      <div>
      
        {/* {tool.label} */}
        <a
          data-tooltip="Edit Tool"
          data-position="bottom"
          href={`#?`}
          className="waves-effect waves-light left tooltipped">
        <i onClick={() => {
          dispatch(editTool(tool));
        }} className="material-icons left">settings_brightness</i>
  </a>


        <a
          
          href={`#${STAGGED_TOOLS_MODAL_ID}`}
          data-tooltip="Edit Tool label"
          data-position="bottom"
          className="waves-effect waves-light left  modal-trigger tooltipped">
          <i
            className="material-icons green-text left"
          >
            {" "}
            edit
          </i>
        </a>


        <span
          className="waves-effect waves-light">
          {tool.label}</span>
        <a
          href={`#${REMOVE_TOOL_MODAL_ID}`}
          data-tooltip="Remove Tool"
          data-position="bottom"

          className="waves-effect  modal-trigger waves-light right tooltipped">
             <i
          className="material-icons red-text right"
            // onClick={() => removeTool(tool.index)}
          >
            {" "}
            clear
          </i>
          </a>
        <i className="material-icons right">{tool.name}</i>

      </div>
    </li>
  ));
}

export default StagedTools;
