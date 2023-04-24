export const getRepoListSuccess = (data) => {
  return {
    type: 'repoListSuccess',
    payload: data,
  }
}

export const getRepoCollaboratorListSuccess = (data) => {
  return {
    type: 'repoCollaboratorListSuccess',
    payload: data,
  }
}

export const getRepoListFailed = (data) => {
  return {
    type: 'repoListFailed',
    payload: data,
  }
}

export const getRepoCollaboratorListFailed = (data) => {
  return {
    type: 'repoCollaboratorListFailed',
    payload: data,
  }
}