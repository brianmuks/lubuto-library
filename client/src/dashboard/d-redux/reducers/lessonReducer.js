import { DROP, DRAG, ADD_TOOL, EDIT_TOOL, UPDATE_TOOL } from "./../constants";

/**
 *
 * @param {*} state object
 * @param {*} action string
 *
 * @returns new state or previous state if no action taken
 * @exports
 *
 */

/**
 NOTE if this reducer will likely grow
 * we can split it into newLesson,EditLesson reducer 
 *but I feel most actions here will be reusabel
 * PLEASE ADVISE
 */

export function lessonReducer(state, action) {
  switch (action.type) {
    case DROP:
      return Object.assign(
        { ...state },
        {
          data: action.data,
          staggedTools: [...state.staggedTools, action.tool]
        }
      );
    case ADD_TOOL:
      return Object.assign(
        { ...state },
        {
          staggedTools: [...state.staggedTools, action.tool]
        }
      );
    case EDIT_TOOL:
      return Object.assign(
        { ...state },
        {
          editTool: action.tool
        }
      );
    // changing color and other stuff
    case UPDATE_TOOL:
      const { color, size, spacing } = action;
      return Object.assign(
        { ...state },
        {
          color,
          size,
          spacing
        }
      );
    default:
      return state;
  }
}
