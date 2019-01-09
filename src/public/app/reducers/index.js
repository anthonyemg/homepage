import { combineReducers } from 'redux';
import * as actions from '../actions';

const initialState = {
  photos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RESET_STATE:
      return initialState;
    case UPDATE_PHOTOS:
      return { ...state, photos:action.payload };
    default:
      return state;
  }
};

export default combineReducers({ reducer });
