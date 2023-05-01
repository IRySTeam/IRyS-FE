import { combineReducers } from 'redux';

// Import all reducers
import userReducer from './userReducer';
import repositoryReducer from './repositoryReducer';
import joinedRepositoryReducer from './joinedRepositoryReducer';
import singleRepositoryReducer from './singleRepositoryReducer';
import publicRepositoryReducer from './publicRepositoryReducer';
import filterReducer from './filterReducer';
import monitorReducer from './monitorReducer';
import filterOptionReducer from './filterOptionReducer';

const reducers = combineReducers({
  user: userReducer,
  repository: repositoryReducer,
  joinedRepository: joinedRepositoryReducer,
  singleRepository: singleRepositoryReducer,
  publicRepository: publicRepositoryReducer,
  filter: filterReducer,
  monitor: monitorReducer,
  filterOption: filterOptionReducer,
})

export default reducers;