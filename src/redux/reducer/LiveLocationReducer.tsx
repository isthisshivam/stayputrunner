import {
  setLiveLocation,
  clearLiveLocation,
} from "../action/LiveLocationActions";
import {
  SET_LIVE_LOCATION_UPDATES,
  CLEAR_LIVE_LOCATION,
} from "../action/index";
var initialState = {
  isLoading: false,
  location: null,
  error: null,
};

export const LiveLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIVE_LOCATION_UPDATES:
      return {
        ...state,
        isLoading: false,
        location: action.params,
      };

    default:
      return state;
  }
};
