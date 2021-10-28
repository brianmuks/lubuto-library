import React, { useContext, useState, useReducer, useEffect } from "react";
import Draggable from "react-draggable";
import { TOOLS_STATE } from "./../d-context";
import {
  addTool,
  editStaggedTools,
  addAudioFiles,
} from "./../d-redux/actions/lessonActions";
import { getSound, getResourceEditorStyles } from "./methods";
import { getUrlParam } from "../../utilities/Tasks";
import Modal from "antd/lib/modal";
import Button from "antd/lib/button";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { RenderToolDelegator } from "./MainEditor";
import RemoveToolModal, { REMOVE_TOOL_MODAL_ID } from "./RemoveToolModal";
import { Card, Input, Space } from "antd";
import ElementStyleEditor from "./elementEditor/style";
const initialState = {};

const EDIT_TOOL = "EDIT_TOOL";

function reducer(state, action) {
  switch (action.type) {
    case EDIT_TOOL:
      console.log(state);
      return Object.assign({ ...state }, { ...action.newStyle });
    default:
      return state;
  }
}

function ResourceEditor({ visibility, onCancel, onDone, onDelete }) {
  const [stateStyles, _dispatch] = useReducer(reducer, initialState);
  const { state, dispatch } = useContext(TOOLS_STATE);
  const [audioFile, setAudioFile] = useState(null);
  const [text, setText] = useState("");
  const [toolLabel, setToolLabel] = useState("");
  const [copies, setCopies] = useState(1); //copies to make of the selected tool to be edited
  const [isModalVisible, setIsModalVisible] = useState(visibility);
  const [_newStyle, setNewStyle] = useState({});

  const { staggedTools, editTool } = state;

  useEffect(() => {
    setText(editTool.text);

    setToolLabel(editTool.label);
    setIsModalVisible(visibility);
  }, [editTool.text, visibility]);

  useEffect(() => {}, []);

  const onStyleChange = ({ newStyle }) => {
    setNewStyle({ ..._newStyle, ...newStyle });
  };

  const removeTool = () => {
    //toolIndex IS SET ON EVERY tool hover
    const _tools = staggedTools.filter((i) => editTool.index !== i.index);
    dispatch(editStaggedTools(_tools));
    onDelete && onDelete();
  };

  const duplicateTool = (e) => {
    if (!editTool.name) {
      M.toast({ html: "Please select a tool duplicate" });
      return;
    }

    const arrCounter = Array(parseInt(copies)).fill(0);
    arrCounter.forEach(() => {
      const toolIndex = editTool.index;
      const tool = {
        ...editTool,
        audioFile,
        text,
        style: { ...editTool.style, ...stateStyles },
      };
      dispatch(addTool(tool, Math.random() + toolIndex));
    });
  };

  const styles = getResourceEditorStyles();

  const _onDone = () => {
    if (!editTool.name) {
      M.toast({ html: "Please select a tool edit" });
      return;
    }

    const toolIndex = editTool.index;
    let tools = staggedTools.map(
      (i) =>
        (i.index == toolIndex && {
          ...i,
          audioFile,
          text,
          label: toolLabel,
          style: { ...i.style, ...stateStyles },
        }) ||
        i
    );
    Object.keys(editTool).length && dispatch(editStaggedTools(tools));
    setNewStyle({});
    onDone && onDone();
  };

  return (
    <React.Fragment>
      <RemoveToolModal
        removeTool={removeTool}
        toolIndex={editTool.toolIndex}
        label={editTool.name}
      />
      <Modal
        title="20px to Top"
        style={{ top: 20 }}
        width={700}
        title={`Edit Element ${toolLabel}`}
        visible={visibility}
        onOk={_onDone}
        onCancel={onCancel}
      >
        <Row gutter={[16, 16]}>
          <Space>
            <Col offset={10} span={4}>
              <a
                href={`#${REMOVE_TOOL_MODAL_ID}`}
                data-tooltip="Remove Tool"
                data-position="bottom"
                className="waves-effect  modal-trigger waves-light right tooltipped"
              >
                <Button
                  style={{ backgroundColor: "red" }}
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </a>
            </Col>

            <Col span={4}>
              <Button
                onClick={_onDone}
                style={{ backgroundColor: "green" }}
                type="primary"
                shape="circle"
                icon={<SaveOutlined />}
              />
            </Col>
          </Space>
        </Row>
        <React.Fragment>
          <Col>
            <Input
              id={"tool_label"}
              style={{
                backgroundColor: "#4a4343",
                width: "200px",
                height: "70px",
                marginTop: "50px",
                color: "white",
              }}
              key={"toolLabel"}
              defaultValue={editTool.label}
              // addonBefore={label}
              onChange={(e) => setToolLabel(e.target.value)}
              value={toolLabel}
              // placeholder={label}
            />
          </Col>

          <RenderSoundPicker
            _dispatch={_dispatch}
            onSoundSet={(audioFile) => setAudioFile(audioFile)}
          />

          <RenderDuplicateButton
            setCopies={(n) => setCopies(n)}
            onClick={duplicateTool}
          />
          <Row gutter={[16, 16]}>
            <Card
              style={{
                marginLeft: "320px",
                position: "fixed",
              }}
            >
              {editTool && (
                <RenderToolDelegator
                  tool={{
                    ...editTool,
                    text,
                    style: _newStyle
                      ? { ...editTool.style, ..._newStyle }
                      : editTool.style,
                  }}
                  isRender={false}
                />
              )}
            </Card>

            {styles.map((style, key) => (
              <Col index={key} span={4}>
                <ElementStyleEditor
                  visibility={visibility}
                  onStyleChange={onStyleChange}
                  style={style}
                  tool={editTool}
                  stateStyles={_newStyle}
                  _dispatch={_dispatch}
                  label={style.label}
                  name={style.name}
                  key={key}
                />
              </Col>
            ))}

            <Col>
              <Input
                style={{
                  backgroundColor: "#4a4343",
                  width: "200px",
                  height: "70px",
                  marginTop: "50px",
                  color: "white",
                }}
                key={"index"}
                defaultValue={editTool.text}
                // addonBefore={label}
                onChange={(e) => setText(e.target.value)}
                value={text}
                // placeholder={label}
              />
            </Col>

            {/* <RenderText text={text} onChange={setText} /> */}
          </Row>

          {/* <div className={"col s6 center"}>
            <i
              style={stateStyles}
              className={`fa material-icons ${stateStyles.size}`}
            >
              {editTool.name}
            </i>
          </div>
          <br /> */}
        </React.Fragment>

        <a
          href={`#${REMOVE_TOOL_MODAL_ID}`}
          data-tooltip="Remove Tool"
          data-position="bottom"
          className="waves-effect  modal-trigger waves-light right tooltipped"
        >
          <Button
            style={{ backgroundColor: "red" }}
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </a>
      </Modal>
    </React.Fragment>
  );
}

function RenderDuplicateButton({ onClick, setCopies }) {
  return (
    <div className="col m4">
      <input
        title="set the number of copies"
        onChange={(e) => setCopies(e.target.value)}
        type="number"
        className="validate col right m6"
      />
      <i
        title="Make copies of this tool"
        onClick={onClick}
        className={` material-icons right col pointer`}
      >
        library_books
      </i>
    </div>
  );
}

function RenderText({ onChange, text }) {
  return (
    <div className="input-field col s12">
      <input
        defaultValue={text}
        autoFocus
        id={"r-text"}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        className="validate"
      />
      <label className="active " htmlFor={"r-text"}>
        Text
      </label>
    </div>
  );
}

function RenderSoundPicker({ onSoundSet, _dispatch }) {
  const [audioFiles, setAudioFiles] = useState([]);

  function fetchAudio(lessonNumber) {
    const lang = getUrlParam("lang");
    lessonNumber = parseInt(lessonNumber);
    //TODO: use RJX here for debouncing.
    getSound({ lang, lessonNumber })
      .then((files) => {
        console.log("files", files, lessonNumber, lang);

        _dispatch(addAudioFiles(files));
        setAudioFiles(files);
      })
      .catch((err) => {
        console.log("error getting audions", err);
      });
  }

  return (
    <div>
      <div className="input-field col s2">
        <input
          onChange={(e) => fetchAudio(e.target.value)}
          type="number"
          className="validate"
        />
        <label>Sound Source</label>
      </div>
      <div className="input-field col s6">
        <select
          defaultValue={""}
          onChange={(val) => onSoundSet(audioFiles[val.target.value])}
          className="browser-default"
        >
          <option value={""}>Sound</option>
          <RenderAudioOptions audioFiles={audioFiles} />
        </select>
      </div>
    </div>
  );
}

function RenderAudioOptions({ audioFiles }) {
  if (!audioFiles) return null;
  return audioFiles.map((item, index) => (
    <option value={index} key={index}>
      {item.name.replace(".wav", "")}
    </option>
  ));
}

export default ResourceEditor;
