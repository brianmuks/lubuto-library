import React, { useContext } from "react";
import { TOOLS_STATE } from "./../d-context";
import { editTool } from "./../d-redux/actions/lessonActions";

function StagedTools() {
  const { state, dispatch } = useContext(TOOLS_STATE);
  const tools = state.staggedTools;

  return (
    <div className=" right col m2 staged-resource editor">
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
  return tools.map((tool, key) => (
    <li
      key={key}
      className="collection-item"
      onClick={() => {
        dispatch(editTool(tool));
      }}
    >
      <div>
        {tool.label}
        <a href="#!" className="secondary-content">
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
