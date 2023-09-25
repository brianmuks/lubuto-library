import React, { useContext,useState,useEffect } from "react";
import { COL_PAGES, COL_Lessons } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";
import { STUDENT_LESSON_STATE } from "./../s-context";
import { getUrlParam } from "../../utilities/Tasks";
import { addEndTime } from "../s-statistics/methods";

function Pages({ pages, match}) {
  const [_pages,setPages] = useState([]);
  const { state, dispatch } = useContext(STUDENT_LESSON_STATE);

  useEffect(()=>{
    setPages(pages)
  }, [pages]);
  

  return (
    <div className="  staged-resource pages-container">
      <ul className="collection with-header">
        <li className="collection-header ">
          <h6>Pages </h6>
        </li>
        <RenderLessonPages match={match} pages={pages}  />
      </ul>
    </div>
  );
}

function RenderLessonPages({ pages, match }) {
  
  return pages.map((lesson, key) => (
    <li
      key={key}
      className={`collection-item lesson-page ${lesson._id === getUrlParam('id') && "blue-grey lighten-3" } `}
      onClick={() => {
        const link = `${match.path}/?lang=${getUrlParam('lang')}&id=${lesson._id}&n=${lesson.meta.lessonNumber}`
        getUrlParam('id') !== lesson._id && addEndTime(lesson._id);
      

        location.href = link;

        // dispatch(editTool(tool));
      }}
    >
      <div>
        <a href="#!" className="secondary-content">
          <i className="material-icons">{`filter_${key + 1 > 9 ? '9_plus' : key + 1}`}</i>
        </a>
        {`Page ${lesson.meta.lessonPageNumber}`}
      </div>
    </li>
  ));
}

export default withTracker(({_id}) => {
 
  Meteor.subscribe("col_pages");
  Meteor.subscribe("users");
  const lang = getUrlParam('lang');
  let lessonNumber = getUrlParam('n');
  lessonNumber = parseInt(lessonNumber)
  const query = { 'meta.lang': lang,'meta.lessonNumber':lessonNumber}
  return {
    pages: COL_Lessons.find(query, { sort: { 'meta.lessonPageNumber':1}}).fetch()
  };
})(Pages);
