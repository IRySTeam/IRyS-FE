export const getDatabasesDataSuccess = (data) => {
  return {
    type: 'databasesSuccess',
    payload: data,
  }
}

export const getDatabasesDataFailed = (data) => {
  return {
    type: 'databasesFailed',
    payload: data,
  }
}