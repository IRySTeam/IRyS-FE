export const getJoinedRepoListSuccess = (data) => {
  return {
    type: 'joinedRepoListSuccess',
    payload: data,
  }
}

export const getJoinedRepoListFailed = (data) => {
  return {
    type: 'joinedRepoListFailed',
    payload: data,
  }
}