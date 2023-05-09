export const getDocumentDetailSuccess = (data) => {
  return {
    type: 'documentSuccess',
    payload: data,
  }
}

export const getDocumentDetailFailed = (data) => {
  return {
    type: 'documentFailed',
    payload: data,
  }
}