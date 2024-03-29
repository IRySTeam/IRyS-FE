const initialState = {
  repositories: [],
  total_page: null,
  total_items: null,
  does_user_have_any_repos: false,
  error: null,
}

const joinedRepositoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'joinedRepoListSuccess':
      return {
        ...state,
        repositories: action.payload.results,
        total_page: action.payload.total_page,
        total_items: action.payload.total_items,
        does_user_have_any_repos: action.payload.does_user_have_any_repos,
        error: null, 
      }; 
    case 'joinedRepoListFailed': 
      return { 
        ...state, 
        repositories: [],
        total_page: null,
        total_items: null,
        does_user_have_any_repos: false,
        error: action.payload.error_code, 
      };
    default: 
      return state    
  }
}

export default joinedRepositoryReducer;