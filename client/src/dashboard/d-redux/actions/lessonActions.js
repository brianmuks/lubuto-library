import { DROP, UPDATE_TOOL, ADD_TOOL,EDIT_TOOL,EDIT_STAGGED_TOOL } from "./../constants";

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

export function updateTool(color, bgColor, size='', spacing=''){
  return {
    type: UPDATE_TOOL,
    color,
    bgColor,
    size,
    spacing
  }
}

