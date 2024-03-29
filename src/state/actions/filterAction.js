export const saveAdvancedSearchNavbar = (data) => {
  return {
    type: 'navbar',
    payload: data,
  }
}

export const saveAdvancedSearchSearchBar = (data) => {
  return {
    type: 'searchbar',
    payload: data,
  }
}

export const saveAdvancedSearchBasic = (data) => {
  return {
    type: 'basic',
    payload: data,
  }
}

export const saveAdvancedSearchCli = (data) => {
  return {
    type: 'cli',
    payload: data,
  }
}

export const saveAdvancedSearchFile = (data) => {
  return {
    type: 'file',
    payload: data,
  }
}

export const resetFilterAdvancedSearch = (data) => {
  return {
    type: 'reset',
    payload: data,
  }
}