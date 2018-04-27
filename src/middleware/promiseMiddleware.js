export default function promiseMiddleware( objMethods ) {
  return (next) => (action) => {
    const { promise, types, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, ERROR] = types;

    next({ ...rest, type: REQUEST });
    
    return promise.then(
      (result) => next({ ...rest, result, type: SUCCESS }),
      (error) => next({ ...rest, error, type: ERROR })
    );
  };
}