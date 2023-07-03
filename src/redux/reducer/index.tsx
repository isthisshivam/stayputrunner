import { combineReducers } from "redux";
import {
  SET_LIVE_LOCATION_UPDATES,
  CLEAR_LIVE_LOCATION,
} from "../action/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LiveLocationReducer } from "../reducer/LiveLocationReducer";

const allLocationReducer = combineReducers({
  LiveLocationReducer: LiveLocationReducer,
});

export const rootLiveLocationReducer = (state, action) => {
  if (action.type === CLEAR_LIVE_LOCATION) {
    AsyncStorage.removeItem("persist:foodId");
    state = null;
  }

  return allLocationReducer(state, action);
};
//export default { rootLiveLocationReducer };
