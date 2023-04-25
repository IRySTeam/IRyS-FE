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
    case 'changeRepoVisibilitySuccess':
      return {
        ...state,
        is_public: action.payload.is_public,
      };
    case 'addCollaboratorToRepo':
      const newCollaborator = {
        id: action.payload.newCollaborator.id,
        first_name: action.payload.newCollaborator.first_name,
        last_name: action.payload.newCollaborator.last_name,
        email: action.payload.newCollaborator.email,
        role: action.payload.role,
      }
      return{
        ...state,
        collaborators: [...state.collaborators, newCollaborator]
      };
    default: 
      return state    
  }
}

export default repositoryReducer;