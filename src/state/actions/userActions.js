export const getUserDetailSuccess = (data) => {
  return {
    type: "userSuccess",
    payload: data,
  }
}

export const getUserDetailFailed = (data) => {
  return {
    type: "userFailed",
    payload: data,
  }
}