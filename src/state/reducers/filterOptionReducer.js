import { convertExtractionDomainArray, convertFilterKeyArray, convertFilterKeyOperatorArray, convertFilterKeyTypeArray } from "@/utils/array";

const initialState = {
  domain_option: [{value: 'general', label: 'General'}],
  filter_key_option: [],
  filter_type_option: [],
  filter_operator_option: [],
  error: null,
}

const filterOptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'domainOptionSuccess':
      return {
        ...state,
        domain_option: convertExtractionDomainArray(action.payload),
        error: action.null,
      }; 
    case 'domainOptionFailed': 
      return { 
        ...state, 
        domain_option: [{value: 'general', label: 'General'}],
        error: action.payload.error,
      };
    case 'filterOptionSuccess':
      return {
        ...state,
        filter_key_option: convertFilterKeyArray(action.payload),
        filter_type_option: convertFilterKeyTypeArray(action.payload),
        filter_operator_option: convertFilterKeyOperatorArray(action.payload),
        error: null,
      }; 
    case 'filterOptionFailed': 
      return { 
        ...state, 
        filter_key_option: [],
        filter_type_option: [],
        filter_operator_option: [],
        error: action.payload.error,
      };
    default: 
      return state    
  }
}

export default filterOptionReducer;