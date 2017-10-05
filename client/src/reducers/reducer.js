import { SNIPPET_SELECTED } from '../actions/actions';
import update from 'immutability-helper';

const initialState = {
    selectedSnippet: null
}

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case SNIPPET_SELECTED:
          return update(state, {
            selectedSnippet: {
              $set: action.payload
            }
          });
    default:
      return state;
  }
}

export default reducer;
