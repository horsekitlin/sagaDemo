import { put, call } from 'redux-saga/effects';
import types from "../constants/actionTypes";
import { getValue } from '../utils/firebaseManager';

export function* getTasksSaga({payload}){
  try {
    const tasks = yield call(getValue, '/tasks');
    // const tasks = yield getValue('/tasks');
    // throw new Error();
    yield put({
      type: types.GET_TASKS_SUCCESS,
      payload: tasks
    });
  } catch (error){
    yield put({
      type: types.GET_TASKS_ERROR,
    });
  }
}