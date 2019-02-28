import { DROP, SET_META, UPDATE_TOOL, ADD_TOOL,EDIT_TOOL,EDIT_STAGGED_TOOL, ADD_AUDIO_FILES, ADD_IMAGE_FILES } from "./../constants";

/**
 *
 * @param {*} data object of {tool:<new tool>,tools:<current tools>}
 */

export function addTool(tool,index) {
  return { type: ADD_TOOL,tool:{...tool,index}  };
}

export function editTool(tool) {
  return { type: EDIT_TOOL,tool  };
}

export function editStaggedTools(tools) {
  return { type: EDIT_STAGGED_TOOL,tools  };
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

export function updateTool(color, bgColor, size='', spacing=''){
  return {
    type: UPDATE_TOOL,
    color,
    bgColor,
    size,
    spacing
  }
}

