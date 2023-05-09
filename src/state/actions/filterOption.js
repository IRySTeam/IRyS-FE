export const getFilterOptionSuccess = (data) => {
  return {
    type: 'filterOptionSuccess',
    payload: data,
  }
}

export const getFilterOptionFailed = (data) => {
  return {
    type: 'filterOptionFailed',
    payload: data,
  }
}

export const getDomainOptionSuccess = (data) => {
  return {
    type: 'domainOptionSuccess',
    payload: data,
  }
}

export const getDomainOptionFailed = (data) => {
  return {
    type: 'domainOptionFailed',
    payload: data,
  }
}