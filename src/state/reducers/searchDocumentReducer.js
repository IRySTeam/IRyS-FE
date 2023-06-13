const initialState = {
  documents: [],
  count: 0,
  error: null,
}

const searchDocumentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'searchDocumentSuccess':
      return {
        ...state,
        documents: action.payload.result,
        count: action.payload.num_docs_retrieved,
        error: null, 
      }; 
    case 'searchDocumentFailed': 
      return { 
        ...state, 
        documents: [],
        count: 0,
        error: action.payload.error, 
      };
    case 'updateDocuments': 
      return { 
        ...state, 
        documents: action.payload, 
      };
    default: 
      return state    
  }
}

export default searchDocumentReducer;