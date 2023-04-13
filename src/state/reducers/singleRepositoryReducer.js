const initialState = {
  documents: [],
  isEmpty: false,
  error: null,
}

const singleRepositoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'singleRepoSuccess':
      return {
        ...state,
        documents: action.payload.documents ,
        isEmpty: action.payload.isEmpty,
        error: null, 
      }; 
    case 'singleRepoFailed': 
      return { 
        ...state, 
        documents: [],
        isEmpty: false,
        error: action.payload.error, 
      };
    default: 
      return state    
  }
}

export default singleRepositoryReducer;