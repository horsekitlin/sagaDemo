import types from '../constants/actionTypes';
import {getValue} from '../utils/firebaseManager';

function setFetchingStatus(dispatch, boolean){
  dispatch({
    type: types.HANDLE_FETCHING,
    payload: {isFetching: boolean}
  });
}

export function sleep(miniseconds = 3000){
  return new Promise(resolve => setTimeout(resolve, miniseconds));
}

export const getTasksAction = payload => {
  // Promise middleware example
  // return {
  //   types: [types.GET_TASKS, types.GET_TASKS_SUCCESS, types.GET_TASKS_ERROR],
  //   promise: getValue('/tasks')
  // }

  //Thunk middleware example

  return async (dispatch) => {
    try{
      setFetchingStatus(dispatch, true);
      // throw new Error();
      const tasks = await getValue('/tasks');
      dispatch({
        type: types.GET_TASKS_SUCCESS,
        payload: tasks
      });
      // await sleep();
      setFetchingStatus(dispatch, false);
    }catch(error){
      setFetchingStatus(dispatch, false);
      dispatch({
        type: types.GET_TASKS_ERROR
      });
    }
  }
}