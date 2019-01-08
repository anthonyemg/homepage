import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  photos: [],
});

const videos = (state = null, action) => {
  switch (action.type) {
    case 'GET_VPHOTOS':
      return action.payload;
    default:
      return state;
  }
};

export default rootReducer;
