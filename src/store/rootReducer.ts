import { combineReducers } from "redux";
import { TestReducer } from "./reducers";

const rootReducer = combineReducers({
  TestReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
