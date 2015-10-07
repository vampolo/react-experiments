import * as authActions from '../auth/actions';
import * as todosActions from '../todos/actions';
import * as sysdigActions from '../sysidg/actions';
import {Map} from 'immutable';
import {bindActionCreators} from 'redux';

const actions = [
  authActions,
  todosActions,
  sysdigActions
];

export default function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch)
  };
}
