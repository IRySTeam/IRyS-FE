const initialState = {
  path: '',
  mode: 'basic',
  keyword: '',
  domain: 'general',
  filters: [],
  cliQuery: '',
  file: '',
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'basic':
      return {
        ...state,
        mode: 'basic',
        keyword: action.payload.keyword,
        domain: action.payload.domain,
        filters: action.payload.filters,
      }; 
    case 'cli': 
      return { 
        ...state,
        mode: 'cli',
        cliQuery: action.payload.cliQuery, 
      };
    case 'file': 
      return { 
        ...state,
        mode: 'file',
        file: action.payload.file, 
      };
    case 'navbar':
      return {
        ...state,
        mode: 'basic',
        keyword: action.payload,
      }; 
    case 'searchbar':
      return {
        ...state,
        mode: 'searchbar',
        keyword: action.payload,
      }; 
    case 'reset': 
      return { 
        ...state,
        path: action.payload.path,
        mode: 'basic',
        keyword: '',
        domain: 'general',
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
        file: '',
      };
    default: 
      return state    
  }
}

export default filterReducer;