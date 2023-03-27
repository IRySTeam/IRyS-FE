const initialState = {
  id: null,
  email: null,
  first_name: null,
  last_name: null,
  error: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "userSuccess":
      return {
        ...state,
        id: action.payload.id ,
        email: action.payload.email,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        error: null, 
      }; 
    case "userFailed": 
      return { 
        ...state, 
        id: null,
        email: null,
        first_name: null,
        last_name: null,
        error: action.payload.error, 
      };
    default: 
      return state    
  }
}

export default userReducer;