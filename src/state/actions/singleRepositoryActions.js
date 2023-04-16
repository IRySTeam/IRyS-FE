export const getSingleRepoSuccess = (data) => {
  return {
    type: 'singleRepoSuccess',
    payload: data,
  }
}

export const getSingleRepoFailed = (data) => {
  return {
    type: 'singleRepoFailed',
    payload: data,
  }
}