import firebase from 'firebase';
import configs from '../configs';

firebase.initializeApp(configs.firebaseConfig);

const database = firebase.database();

export const getUnquieKey = (route) => database.ref().child(route).push().key

export function addNewData({route, query}){
  if(query.StoreKey === undefined) query.StoreKey = getUnquieKey(route);

  const updates = {
    [`${route}/${query.StoreKey}`]: query
  };
  return database.ref().update(updates);
}

export const getDetail = (route) => database.ref(route).once('value').een((snapshot) => snapshot.val());

export const getValue = (route) =>
  database.ref(route).once("value")
    .then(function(snapshot) {
      const data = snapshot.val();
      const items = [];
      for(let key in data){
        let item = data[key];
        items.push(item);
      }
      return items;
    });