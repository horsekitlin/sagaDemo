function applyMiddlewareDemo(...middlewares){
  middlewares.map(middleware => middleware());
}

const step1 = () => console.log('step1');
const step2 = () => console.log('step2');
const step3 = () => console.log('step3');
const step4 = () => console.log('step4');

applyMiddlewareDemo(step1);
