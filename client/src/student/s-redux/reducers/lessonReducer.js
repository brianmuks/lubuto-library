import { DROP, DRAG, ADD_TOOL, EDIT_TOOL, UPDATE_TOOL,EDIT_STAGGED_TOOL, SET_LESSON_ID, SET_LANGUAGE } from "./../constants";

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

    case SET_LESSON_ID:
      return Object.assign(
        { ...state },
        {
          lessonId: action.lessonId
        }
      );

    case SET_LANGUAGE:
      return Object.assign(
        { ...state },
        {
          language: action.language
        }
      );



    case DROP:
      return Object.assign(
        { ...state },
        {
          data: action.data,
          staggedTools: [...state.staggedTools, action.tool]
        }
      );
    case ADD_TOOL:
    console.log(action.tool)
      return Object.assign(
        { ...state },
        {
          staggedTools: [...state.staggedTools,action.tool]
        }
      );
    case EDIT_TOOL:
      return Object.assign(
        { ...state },
        {
          editTool: action.tool
        }
      );

      case EDIT_STAGGED_TOOL:
      return Object.assign(
        { ...state },
        {
          staggedTools: action.tools,
          editTool:{},
        }
      );

    // changing color and other stuff
    case UPDATE_TOOL:
      const { color, bgColor, size, spacing } = action;
      return Object.assign(
        { ...state },
        {
          color,
          bgColor,
          size,
          spacing
        }
      );
    default:
      return state;
  }
}
