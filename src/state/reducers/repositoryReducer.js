const initialState = {
  id: null,
  name: null,
  description: null,
  is_public: null,
  updated_at: null,
  owner: null,
  current_user_role: null,
  collaborators: null,
  error: null,
}

const repositoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'repoDetailSuccess':
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        is_public: action.payload.is_public,
        updated_at: action.payload.updated_at,
        owner: action.payload.owner,
        current_user_role: action.payload.current_user_role,
        error: null, 
      }; 
    case 'repoDetailFailed': 
      return { 
        ...state, 
        id: null,
        name: null,
        description: null,
        is_public: null,
        updated_at: null,
        owner: null,
        current_user_role: null,
        error: action.payload.error_code, 
      };
    case 'repoCollaboratorListSuccess':
      return {
        ...state,
        collaborators: action.payload,
      }; 
    case 'repoCollaboratorListFailed':
      return {
        ...state,
        error: action.payload.error_code,
      }; 
    case 'changeRepoDetailSuccess':
      return {
        ...state,
        name: action.payload.name,
        description: action.payload.description,
      }; 
    default: 
      return state    
  }
}

export default repositoryReducer;