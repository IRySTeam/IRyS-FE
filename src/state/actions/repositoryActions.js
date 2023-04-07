export const getRepoListSuccess = (data) => {
  return {
    type: "repoListSuccess",
    payload: data,
  }
}

export const getRepoListFailed = (data) => {
  return {
    type: "repoListFailed",
    payload: data,
  }
}