
import {DROP,DRAG,ADD_TOOL,EDIT_TOOL} from './../constants';



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
      return Object.assign({...state},{
        data:action.data,
        staggedTools:[...state.staggedTools,action.tool]
    });
      case DRAG:
      return Object.assign({...state},{
        //NEED HELP : data here seems a bit general. are we able to 
        // find a more specific name for readbility purposes
        //keeping in mind that redux stores all items in one container
        //when examining the store we might not be able to tell what data
        // is for  
        data:action.data 
    });
        case ADD_TOOL:
        return Object.assign({...state},{
          staggedTools:[...state.staggedTools,action.tool]
        });
        case EDIT_TOOL:
        return Object.assign({...state},{
          editTool:action.tool
        });
      default:
      
      return state;
    }
  }