const initialState = {
  count: 0,
  isEmpty: false,
  error: null,
}

const singleRepositoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'singleRepoSuccess':
      return {
        ...state,
        count: action.payload.count,
        isEmpty: action.payload.count === 0,
        error: null, 
      }; 
    case 'singleRepoFailed': 
      return { 
        ...state, 
        count: 0,
        isEmpty: false,
        error: action.payload.error, 
      };
    default: 
      return state    
  }
}

export default singleRepositoryReducer;