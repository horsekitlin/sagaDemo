
function applyMiddlewareDemo(...middlewares){
  const args = [
    dispatchStr => console.log('dispatch function', dispatchStr) || 'dispatchStr',
    getStateStr => console.log('getState function', getStateStr) || 'getStateStr'
  ];

  middlewares.map(middleware => middleware(...args));
}

const step1 = (dispatch) => console.log('step1', dispatch('廣播'));
const step2 = (dispatch, getState) => console.log('step2', getState('拿取 store data'));
const step3 = () => console.log('step3');
const step4 = () => console.log('step4');

applyMiddlewareDemo(step1);