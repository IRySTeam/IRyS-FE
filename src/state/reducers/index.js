import { combineReducers } from 'redux';

// Import all reducers
import userReducer from './userReducer';
import repositoryReducer from './repositoryReducer';
import joinedRepositoryReducer from './joinedRepositoryReducer';
import singleRepositoryReducer from './singleRepositoryReducer';
import publicRepositoryReducer from './publicRepositoryReducer';
import filterReducer from './filterReducer';

const reducers = combineReducers({
  user: userReducer,
  repository: repositoryReducer,
  joinedRepository: joinedRepositoryReducer,
  singleRepository: singleRepositoryReducer,
  publicRepository: publicRepositoryReducer,
  filter: filterReducer,
})

export default reducers;