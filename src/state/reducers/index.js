import { combineReducers } from 'redux';

// Import all reducers
import userReducer from './userReducer';
import joinedRepositoryReducer from './joinedRepositoryReducer';
import singleRepositoryReducer from './singleRepositoryReducer';
import publicRepositoryReducer from './publicRepositoryReducer';
import filterReducer from './filterReducer';

const reducers = combineReducers({
  user: userReducer,
  joinedRepository: joinedRepositoryReducer,
  singleRepository: singleRepositoryReducer,
  publicRepository: publicRepositoryReducer,
  filter: filterReducer,
})

export default reducers;