
import {
  combineReducers,
} from 'redux';
import tasks from './tasks';
import status from './status';

export default combineReducers({
  tasks,
  status
});