export const getMonitorDataSuccess = (data) => {
  return {
    type: 'monitorSuccess',
    payload: data,
  }
}

export const getMonitorDataFailed = (data) => {
  return {
    type: 'monitorFailed',
    payload: data,
  }
}