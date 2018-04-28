import types from "../constants/actionTypes";
import { takeLatest } from 'redux-saga/effects';
import { getTasksSaga } from "./taskSaga";

export function* watchGetTasksSaga (){
  yield takeLatest(types.GET_TASKS, getTasksSaga);
}
