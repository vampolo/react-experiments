import {combineReducers} from 'redux';

// Reducers
import auth from '../auth/reducer';
import device from '../device/reducer';
import intl from '../intl/reducer';
import todos from '../todos/reducer';
import users from '../users/reducer';
import sysdig from '../sysidg/reducer';

const appReducer = combineReducers({
  auth,
  device,
  intl,
  todos,
  users,
  sysdig
});

export default appReducer;
