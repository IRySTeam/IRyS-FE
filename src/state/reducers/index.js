import { combineReducers } from 'redux';

// Import all reducers
import userReducer from './userReducer';
import repositoryReducer from './repositoryReducer';
import singleRepositoryReducer from './singleRepositoryReducer';

const reducers = combineReducers({
  user: userReducer,
  repository: repositoryReducer,
  singleRepository: singleRepositoryReducer,
})

export default reducers;