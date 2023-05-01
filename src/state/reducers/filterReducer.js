const initialState = {
  path: '',
  keyword: '',
  domain: '',
  filters: null,
  cliQuery: '',
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'basic':
      return {
        ...state,
        keyword: action.payload.keyword,
        domain: action.payload.domain,
        filters: action.payload.filters,
      }; 
    case 'cli': 
      return { 
        ...state,
        cliQuery: action.payload.cliQuery, 
      };
    case 'reset': 
      return { 
        ...state,
        path: action.payload.path,
        keyword: '',
        domain: '',
        filters: [{
          key: '',
          data_type: '',
          operator: '',
          value: '',
          model: '',
          scoring_algorithm: '',
          top_n: '',
          score_threshold: '',
        }],
        cliQuery: '', 
      };
    default: 
      return state    
  }
}

export default filterReducer;