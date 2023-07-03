import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import {
  persistStore,
  persistCombineReducers,
  persistReducer,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { rootLiveLocationReducer } from "../reducer";
const rootLiveLocationPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["live_location_reducer"],
};
const rootReducer = combineReducers({
  liveLocationReducerData: persistReducer(
    rootLiveLocationPersistConfig,
    rootLiveLocationReducer
  ),
  // other: persistReducer(rootPersistConfig, RootReducer),
});
const store = createStore(rootReducer);
const persistor = persistStore(store);

export { store, persistor };
