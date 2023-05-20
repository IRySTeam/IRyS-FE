const initialState = {
  questions: '',
  error: null,
}

const faqReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'faqSuccess':
      return {
        ...state,
        questions: action.payload,
        error: null, 
      }; 
    case 'faqFailed': 
      return { 
        ...state, 
        questions: [],
        error: action.payload.error, 
      };
    default: 
      return state    
  }
}

export default faqReducer;