import React, { useContext } from "react";
import { TOOLS_STATE } from "./../s-context";
import { editTool, editStaggedTools } from "./../s-redux/actions/lessonActions";

function Pages() {
  const { state, dispatch } = useContext(TOOLS_STATE);
  const tools = state.staggedTools;

  return (
    <div className="  staged-resource pages-container">
      <ul className="collection with-header">
        <li className="collection-header ">
          <h6>Pages</h6>
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


  return [1,2,3,4,5,7,8,9,10,11].map((tool, key) => (
    <li
      key={key}
      // onMouseOver={() => highlight({ editTool: tool, _tools: tools, ishighlight:true})}
      // onMouseOut={() => highlight({ editTool:tool, _tools:tools})}
      className="collection-item"
      onClick={() => {
        // dispatch(editTool(tool));
      }}
    >
      <div>
        <a href="#!" className="secondary-content">
          <i className="material-icons">{`filter_${key + 1 > 9 ? '9_plus' : key + 1}`}</i>
        </a>
        
        {`Page ${key+1}`}
      </div>
    </li>
  ));
}

export default Pages;
