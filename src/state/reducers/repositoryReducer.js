const initialState = {
  repositories: [],
  total_page: null,
  total_items: null,
  error: null,
}

const repositoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'repoListSuccess':
      return {
        ...state,
        repositories: action.payload.results,
        total_page: action.payload.total_page,
        total_items: action.payload.total_items,
        error: null, 
      }; 
    case 'repoListFailed': 
      return { 
        ...state, 
        repositories: [],
        total_page: null,
        total_items: null,
        error: action.payload.error_code, 
      };
    default: 
      return state    
  }
}

export default repositoryReducer;