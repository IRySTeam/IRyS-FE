export const getRepoDetailSuccess = (data) => {
  return {
    type: 'repoDetailSuccess',
    payload: data,
  }
}

export const getRepoCollaboratorListSuccess = (data) => {
  return {
    type: 'repoCollaboratorListSuccess',
    payload: data,
  }
}

export const changeRepoDetailSuccess = (data) => {
  return {
    type: 'changeRepoDetailSuccess',
    payload: data,
  }
}

export const getRepoDetailFailed = (data) => {
  return {
    type: 'repoDetailFailed',
    payload: data,
  }
}

export const getRepoCollaboratorListFailed = (data) => {
  return {
    type: 'repoCollaboratorListFailed',
    payload: data,
  }
}