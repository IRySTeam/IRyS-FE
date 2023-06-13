export const isNotAdmin = (role) => {
  return role === 'Uploader'|| role === 'Viewer'
}

export const isOwner = (role) => {
  return role === 'Owner'
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

export const isOwnerDocs = (role) => {
  return role === 'Owner'
}

export const isEditorDocs = (role) => {
  return role === 'Editor' || role === 'Owner'
}

export const isViewerDocs = (role) => {
  return role === 'Viewer' || role === 'Editor' || role === 'Owner'
}