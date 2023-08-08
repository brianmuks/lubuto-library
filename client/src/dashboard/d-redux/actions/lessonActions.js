import { DROP, SET_META, UPDATE_TOOL, ADD_TOOL, EDIT_TOOL, EDIT_STAGGED_TOOL, ADD_AUDIO_FILES, ADD_IMAGE_FILES } from "./../constants";

sessionStorage.setItem(EDIT_STAGGED_TOOL, JSON.stringify([]));

/**
 *
 * @param {*} data object of {tool:<new tool>,tools:<current tools>}
 */

export function addTool(tool, index) {
  return {
    type: ADD_TOOL, tool: {
      ...tool, index, style: {
        position: 'absolute', 'margin-bottom': '50px',
        padding: '20px',
        ...tool.style
      }
    }
  };
}

export function editTool(tool) {
  return { type: EDIT_TOOL, tool };
}

export function editStaggedTools(tools) {
  keepCopy(tools)
  return { type: EDIT_STAGGED_TOOL, tools };
}

function keepCopy(tools) {
  //keep a record on localstorage for undo (CTRL+Z)
  if (typeof (Storage) !== "undefined") {
    let data = JSON.parse(sessionStorage.getItem(EDIT_STAGGED_TOOL));
    data = Array.from(data);
    data.unshift(tools);
    console.log('data', data);
    // data[0] && console.log(data, 'sessionStorage Data')
    sessionStorage.setItem(EDIT_STAGGED_TOOL, JSON.stringify(data));
  }
}

export function addAudioFiles(audiosFiles) {
  return { type: ADD_AUDIO_FILES, audiosFiles };
}

export function addImageFiles(imagesFiles) {
  return { type: ADD_IMAGE_FILES, imagesFiles };
}
export function setMeta(meta) {
  return { type: SET_META, meta };
}

export function updateTool(color, bgColor, size = '', spacing = '') {
  return {
    type: UPDATE_TOOL,
    color,
    bgColor,
    size,
    spacing
  }
}

