import { DROP, DRAG, ADD_TOOL,EDIT_TOOL } from "./../constants";

/**
 *
 * @param {*} data object of {tool:<new tool>,tools:<current tools>}
 */

export function addTool(tool) {
  return { type: ADD_TOOL,tool  };
}

export function editTool(tool) {
  return { type: EDIT_TOOL,tool  };
}


