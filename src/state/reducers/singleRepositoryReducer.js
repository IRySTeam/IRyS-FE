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
        documents: action.payload ,
        isEmpty: action.payload.length === 0,
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