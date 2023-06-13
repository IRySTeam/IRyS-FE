export const getSearchDocumentSuccess = (data) => {
  return {
    type: 'searchDocumentSuccess',
    payload: data,
  }
}

export const getSearchDocumentFailed = (data) => {
  return {
    type: 'searchDocumentFailed',
    payload: data,
  }
}

export const updateDocuments = (data) => {
  return {
    type: 'updateDocuments',
    payload: data,
  }
}