import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { COL_TOOLS } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";
import { TOOLS_STATE } from "./../d-context";
import { addTool } from "./../d-redux/actions/lessonActions";
import { editLesson, saveLesson } from "./methods";
import { ALPHABET } from "../../utilities/constants";
import ImageList, {
  MODAL_ID as ImageList_MODAL_ID,
  openImageList,
} from "./ImageList";

function Tools(props) {
  const { state, dispatch } = useContext(TOOLS_STATE);
  const [lessonId, setLessonId] = useState(null);


  useEffect(() => {
    // initModal('#' + MODAL_ID);
    // _openImageList()
  });

  const _openImageList = () => {
    openImageList();
  };

  const onImageSelect = (file, index) => {
    // let dotIndex = path.indexOf('.');
    // dotIndex = dotIndex > 10 && 10 || dotIndex;


    // const label = path.toString().substr(0, dotIndex);
    dispatch(
      addTool(
        {
          name: "add_a_photo",
          label: file.name,
          path: `${file._id}${file.extensionWithDot}`,
          type: "image",
          _id: new Meteor.Collection.ObjectID().valueOf(),
        },
        Math.random() + index + Math.random()
      )
    ); //avaoid acceidentally generating the same index as icons tools
  };

  const preview = (ev) => {
    ev.preventDefault();
  };
  const _saveLesson = (ev) => {

    if (lessonId !== null) {
      //user has already saved. the lesson should be updated this time around
      editLesson({ lesson: state.staggedTools, meta: state.meta, lessonId });
      return;
    }

    saveLesson(state.staggedTools, state.meta)
      .then((_id) => {
        setLessonId(_id);
      })
      .catch((err) => {});
  };

  return (
    <>
      <Link
        target="_blank"
        onClick={preview}
        to={"/lesson"}
        className="btn right red"
      >
        Preview
      </Link>
      <ImageList onImageSelect={onImageSelect} />
      {/* <button className="btn right red" onClick={_openImageList}>Click me</button> */}

      <ul id="slide-out" className="sidenav  sidenav-fixed">
        <li
          onClick={(e) =>
            props.isEdit
              ? editLesson({
                  lesson: state.staggedTools,
                  meta: state.meta,
                  lessonId: props.lessonId,
                })
              : _saveLesson(e)
          }
        >
          <button className="btn right red">
            {(props.isEdit && `Update`) || "Save"}
          </button>
          <div className="user-view ">
            <a href="#email">
              <span className="white-text email">olivier@gmail.com</span>
            </a>
          </div>
        </li>

        <li>
          <a href="#!">Tools</a>
        </li>

        <li className="row">
          <Renderalphabet />
        </li>
        <li>
          <div className="divider" />
        </li>
        <RenderalSpecialTools _openImageList={_openImageList} />
        <li>
          <div className="divider" />
        </li>
        <RenderTools tools={props.tools} />
      </ul>
    </>
  );
}

function RenderTools(props) {
  const { state, dispatch } = useContext(TOOLS_STATE);
  useEffect(() => {
  });

  return props.tools.map((tool, index) => (
    <li
      key={index}
      onClick={() => {
        dispatch(addTool({ ...tool, type: "icon" }, Math.random() + index));
      }}
    >
      <a href="#!">
        <i className="material-icons">{tool.name}</i>
        {tool.label}
      </a>
    </li>
  ));
}

function Renderalphabet(props) {
  const { state, dispatch } = useContext(TOOLS_STATE);
  useEffect(() => {
  });

  return ALPHABET.map((tool, index) => (
    <a
      className=" col m2"
      key={index}
      onClick={() => {
        dispatch(
          addTool(
            {
              ...tool,
              type: "icon",
              _id: new Meteor.Collection.ObjectID().valueOf(),
            },
            Math.random() + index
          )
        );
      }}
      href="#!"
    >
      <i className="material-icons">{tool.name}</i>
    </a>
  ));
}

function RenderalSpecialTools() {
  const { state, dispatch } = useContext(TOOLS_STATE);

  const wordWrap = {
    "white-space": " -moz-pre-wrap !important" /* Mozilla, since 1999 */,
    "white-space": "-pre-wrap" /* Opera 4-6 */,
    "white-space": " -o-pre-wrap" /* Opera 7 */,
    "white-space": " pre-wrap" /* css-3 */,
    "word-wrap": " break-word" /* Internet Explorer 5.5+ */,
    "white-space": "-webkit-pre-wrap" /* Newer versions of Chrome/Safari*/,
    "word-break": " break-all",
    "white-space": "normal",
  };

  const specialTools = [
    {
      name: "sort_by_alpha",
      label: "Text",
      type: "text",
      text: "Some text to be edited",
      style: { "font-size": "30px", ...wordWrap },
    },
    { name: "add_a_photo", label: "Image", type: "image", link: "some link" },
    { name: "remove", label: "Blank Line", type: "line", link: "some link" },
  ];
  return specialTools.map(
    (tool, index) =>
      (tool.type === "image" && (
        <RenderImageTool tool={tool} key={index} index={index} />
      )) || (
        <li
          key={index}
          onClick={() => {
            dispatch(addTool(tool, Math.random() + index));
          }}
        >
          <a href={`#`}>
            <i className="material-icons">{tool.name}</i>
            {tool.label}
          </a>
        </li>
      )
  );

  function RenderImageTool({ tool, index }) {
    return (
      <li key={index}>
        <a
          href={`#${ImageList_MODAL_ID}`}
          className="waves-effect waves-light  modal-trigger"
        >
          <i className="material-icons">{tool.name}</i>
          {tool.label}
        </a>
      </li>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("col_tools");
  Meteor.subscribe("users");
  return {
    tools: COL_TOOLS.find().fetch(),
  };
})(Tools);
