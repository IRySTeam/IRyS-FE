import { combineReducers } from "redux";

// Import all reducers
import userReducer from "./userReducer";
import repositoryReducer from "./repositoryReducer";

const reducers = combineReducers({
  user: userReducer,
  repository: repositoryReducer
})

export default reducers;