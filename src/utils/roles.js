export const isNotAdmin = (role) => {
  return role === 'Uploader'|| role === 'Viewer'
}

export const isAdmin = (role) => {
  return role === 'Owner'|| role === 'Admin'
}

export const isUploader = (role) => {
  return role === 'Owner'|| role === 'Admin' || role === 'Uploader'
}

export const isViewerRepo = (role) => {
  return role === 'Viewer'
}