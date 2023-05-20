export const getFAQSuccess = (data) => {
  return {
    type: 'faqSuccess',
    payload: data,
  }
}

export const getFAQFailed = (data) => {
  return {
    type: 'faqFailed',
    payload: data,
  }
}