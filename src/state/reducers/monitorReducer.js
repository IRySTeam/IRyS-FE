const initialState = {
  results: {},
  currentPage: 1,
  total_pages: 1,
  total_items: 0,
  error: '',
}

const monitorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'monitorSuccess':
      return {
        ...state,
        results: action.payload.results,
        currentPage: action.payload.currentPage,
        total_pages: action.payload.total_pages,
        total_items: action.payload.total_items,
        error: '', 
      }; 
    case 'monitorFailed': 
      return {
        results: {},
        currentPage: 1,
        total_pages: 1,
        total_items: 0,
        error: action.payload.error
      }
    default: 
      return state    
  }
}

export default monitorReducer;