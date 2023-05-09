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
import searchDocumentReducer from './searchDocumentReducer';
import searchDocumentPublicReducer from './searchDocumentPublicReducer';
import databasesReducer from './databasesReducer';
import documentReducer from './documentReducer';

const reducers = combineReducers({
  user: userReducer,
  repository: repositoryReducer,
  joinedRepository: joinedRepositoryReducer,
  singleRepository: singleRepositoryReducer,
  publicRepository: publicRepositoryReducer,
  filter: filterReducer,
  monitor: monitorReducer,
  databases: databasesReducer,
  filterOption: filterOptionReducer,
  searchDocument: searchDocumentReducer,
  searchDocumentPublic : searchDocumentPublicReducer,
  document : documentReducer
})

export default reducers;