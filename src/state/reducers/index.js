import { combineReducers } from 'redux';

// Import all reducers
import userReducer from './userReducer';
import repositoryReducer from './repositoryReducer';
import singleRepositoryReducer from './singleRepositoryReducer';
import publicRepositoryReducer from './publicRepositoryReducer';

const reducers = combineReducers({
  user: userReducer,
  repository: repositoryReducer,
  singleRepository: singleRepositoryReducer,
  publicRepository: publicRepositoryReducer,
})

export default reducers;