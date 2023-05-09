const initialState = {
  documents: [],
  count: 0,
  error: null,
}

const searchDocumentPublicReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'searchDocumentPublicSuccess':
      return {
        ...state,
        documents: action.payload.result,
        count: action.payload.num_docs_retrieved,
        error: null, 
      }; 
    case 'searchDocumentPublicFailed': 
      return { 
        ...state, 
        documents: [],
        count: 0,
        error: action.payload.error, 
      };
    default: 
      return state    
  }
}

export default searchDocumentPublicReducer;