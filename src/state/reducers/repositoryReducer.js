const initialState = {
  repositories: [],
  isEmpty: false,
  error: null,
}

const repositoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "repoListSuccess":
      return {
        ...state,
        repositories: action.payload.repositories ,
        isEmpty: action.payload.isEmpty,
        error: null, 
      }; 
    case "repoListFailed": 
      return { 
        ...state, 
        repositories: [],
        isEmpty: false,
        error: action.payload.error, 
      };
    default: 
      return state    
  }
}

export default repositoryReducer;