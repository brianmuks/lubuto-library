import { DROP, DRAG, ADD_TOOL } from "./../constants";

/**
 *
 * @param {*} data object of {tool:<new tool>,tools:<current tools>}
 */
export function addTool(tool, tools) {
  return { type: ADD_TOOL, tool: tool, tools: tools };
}
