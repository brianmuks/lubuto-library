
import {DROP,DRAG,ADD_TOOL} from './../constants';



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

export function lessonReducer(state,action) {
    switch (action.type) {
      case DROP:
        return { ...action,};
      case DRAG:
        return { ...action };
        case ADD_TOOL:
      console.log('ADD_TOOL',state,action)

        return Object.assign({...state},{
            addedTools:[...state.addedTools,action.tool]
        });
      default:
      
      return state;
    }
  }