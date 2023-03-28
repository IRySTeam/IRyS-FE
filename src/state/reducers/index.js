import { combineReducers } from "redux";

// Import all reducers
import userReducer from "./userReducer";

const reducers = combineReducers({
  user: userReducer
})

export default reducers;