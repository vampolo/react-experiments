import * as actions from './actions';
import {Record, List} from 'immutable';

const InitialState = Record({
    events: List()
});

const initialState = new InitialState;

export default function sysdigReducer(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

    switch (action.type) {
    case actions.LOAD_SUCCESS: {
        debugger;
        return state
            .setIn('events', action.payload.response.events);
    }
    }

    return state;
}
