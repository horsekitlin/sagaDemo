export default function promiseMiddleware( objMethods ) {
  return (next) => (action) => {
    const { promise, types } = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, ERROR] = types;

    next({ type: REQUEST });
    // return next({ type: ERROR })
    return promise.then(
      (payload) => next({ payload, type: SUCCESS }),
      (error) => next({ payload:error, type: ERROR })
    );
  };
}