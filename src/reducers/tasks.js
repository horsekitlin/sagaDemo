import types from '../constants/actionTypes';

const initialState = {
  error: false,
  list: []
}

export default function reducer(tasks = initialState, { type, payload }) {
  switch (type) {
    default:
      return tasks;
  }
}