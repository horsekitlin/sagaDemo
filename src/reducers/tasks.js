import types from '../constants/actionTypes';

const initialState = {
  error: false,
  list: []
}

export default function reducer(tasks = initialState, { type, payload }) {
  switch (type) {
    case types.GET_TASKS_SUCCESS:
      return {...tasks, list: tasks.list.concat(payload), error: false};
    case types.GET_TASKS_ERROR:
      return {...tasks, error: true}
    default:
      return tasks;
  }
}