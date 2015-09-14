import getRandomString from '../lib/getrandomstring';
import {Map, Record, List} from 'immutable';
import {actions} from './actions';

const initialState = new (Record({
    data: new (Record({
        events: []
    }))
}));

export default function(state = initialState, action, payload) {
    if (!action) return state;

    switch(action) {
    case actions.newData: {
        return state.set('data', payload);
    }
    }
    return state;
}
