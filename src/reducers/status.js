import types from '../constants/actionTypes';

const initialState = {
  isFetching: false,
}

export default function reducer(status = initialState, { type, payload }) {
  switch (type) {
    case types.HANDLE_FETCHING:
      return {...status, ...payload}
    default:
      return status;
  }
}