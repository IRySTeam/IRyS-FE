export const getPublicRepoListSuccess = (data) => {
  return {
    type: 'publicRepoListSuccess',
    payload: data,
  }
}

export const getPublicRepoListFailed = (data) => {
  return {
    type: 'publicRepoListFailed',
    payload: data,
  }
}