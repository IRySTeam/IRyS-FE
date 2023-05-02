export const getSearchDocumentPublicSuccess = (data) => {
  return {
    type: 'searchDocumentPublicSuccess',
    payload: data,
  }
}

export const getSearchDocumentPublicFailed = (data) => {
  return {
    type: 'searchDocumentPublicFailed',
    payload: data,
  }
}