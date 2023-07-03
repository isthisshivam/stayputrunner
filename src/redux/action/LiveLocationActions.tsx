import { SET_LIVE_LOCATION_UPDATES, CLEAR_LIVE_LOCATION } from "./index";

// init live location
export function setLiveLocation(payload) {
  console.log("setLiveLocation.payload===", payload);
  return {
    type: SET_LIVE_LOCATION_UPDATES,
    params: payload,
  };
}

// clear live location
export function clearLiveLocation() {
  return {
    type: CLEAR_LIVE_LOCATION,
    payload: null,
  };
}
