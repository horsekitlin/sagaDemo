import types from '../constants/actionTypes';
import {getValue} from '../utils/firebaseManager';

function setFetchingStatus(dispatch, boolean){
  dispatch({
    type: types.HANDLE_FETCHING,
    payload: {isFetching: true}
  });
}

export const getTasksAction = payload => {
  return {
    types: [types.GET_TASKS, types.GET_TASKS_SUCCESS, types.GET_TASKS_ERROR],
    promise: getValue('/tasks')
  }
  // return async (dispatch) => {
  //   try{
  //     setFetchingStatus(dispatch, true);
  //     const tasks = await getValue('/tasks');
  //     dispatch({
  //       type: types.CREATE_NEW_TASK_SUCCESS,
  //       payload: 
  //     });
  //   }catch(error){

  //   }
  // }
}