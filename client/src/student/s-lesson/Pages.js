import React, { useContext,useState,useEffect } from "react";
import { COL_PAGES } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";
import { STUDENT_LESSON_STATE } from "./../s-context";
import { getUrlParam } from "../../utilities/Tasks";

function Pages({pages}) {
  const [_pages,setPages] = useState([]);
  const { state, dispatch } = useContext(STUDENT_LESSON_STATE);

  useEffect(()=>{
    setPages(pages)
  }, [pages]);

  return (
    <div className="  staged-resource pages-container">
      <ul className="collection with-header">
        <li className="collection-header ">
          <h6>Pages {getUrlParam('id')}</h6>
        </li>
        <RenderLessonPages pages={_pages}  />
      </ul>
    </div>
  );
}

function RenderLessonPages({ pages }) {
  
  return pages.map((tool, key) => (
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

export default withTracker(({_id}) => {
 
  Meteor.subscribe("col_pages");
  Meteor.subscribe("users");

  return {
    pages: COL_PAGES.find({lessonId:getUrlParam('id')}).fetch()
  };
})(Pages);
