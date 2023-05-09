const initialState = {
  id: null,
  title: null,
  file_url: null,
  doc_detail: {
    doc_metadata:{},
    doc_entities:{},
  },
  error: null,
}

const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'documentSuccess':
      return {
        ...state,
        id: action.payload.id,
        title: action.payload.title,
        file_url: action.payload.file_url,
        doc_detail: action.payload.doc_detail,
        error: null, 
      }; 
    case 'documentFailed': 
      return { 
        ...state, 
        id: null,
        title: null,
        file_url: null,
        doc_detail: {
          doc_metadata:{},
          doc_entities:{},
        },
        error: action.payload.error,
      };
    default: 
      return state    
  }
}

export default documentReducer;