function* generatorDemo(){
  yield 1;
  yield 2;
  console.log('hello');
  yield new Promise(resolve => resolve(3));
  console.log('world');
  yield 'done';
  return;
}

const gen = generatorDemo();

// console.log(gen);
// console.log(gen.next()); // 1
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());

async function asyncfunction(){
  await 1;
  await 2;
  console.log('hello');
  await new Promise(resolve => resolve(3));
  console.log('world');
  await 'done';
  return;
}
console.log(asyncfunction());