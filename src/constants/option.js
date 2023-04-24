export const roleOption = [
  { value: 'owner', label: 'Owner'},
  { value: 'admin', label: 'Admin'},
  { value: 'uploader', label: 'Uploader'},
  { value: 'viewer', label: 'Viewer'},
]

export const newRoleOption = [
  { value: 'admin', label: 'Admin'},
  { value: 'uploader', label: 'Uploader'},
  { value: 'viewer', label: 'Viewer'},
]

export const domainOption = [
  { value: '', label: 'General'},
  { value: 'scientific', label: 'Scientific'},
  { value: 'recruitment', label: 'Recruitment'},
]

export const typeOption = [
  { value: '', label: 'All'},
  { value: 'public', label: 'Public'},
  { value: 'private', label: 'Private'},
]

export const sortOption = [
  { value: '', label: 'None'},
  { value: 'updated_at', label: 'Last Updated'},
  { value: 'name', label: 'Name (A-Z)'},
]

export const filterOption = [
  { value: '', label: 'None'},
  { value: 'LOC', label: 'LOC'},
  { value: 'MISC', label: 'MISC'},
  { value: 'ORG', label: 'ORG'},
  { value: 'PER', label: 'PER'},
  { value: 'mimetype', label: 'Mimetype'},
  { value: 'extension', label: 'Extension'},
  { value: 'size', label: 'Size'},
]

export const operatorOption = [
  { value: '', label: 'None', desc: null},
  { value: 'equal', label: 'EQUAL', desc: 'Finds all documents that do not match a specific metadata/entity value'},
  { value: 'not_equal', label: 'NOT EQUAL', desc: 'Finds all documents that do not match a specific metadata/entity value'},
  { value: 'greater_than', label: 'GREATER THAN', desc: 'Finds metadata values that are greater than a certain numerical value'},
  { value: 'greater_than_equal', label: 'GREATER THAN EQUAL', desc: 'Finds metadata values that are greater than or equal to a certain numerical value '},
  { value: 'less_than', label: 'LESS THAN', desc: 'Finds metadata values that are less than a certain numerical value'},
  { value: 'less_than_equal', label: 'LESS THAN EQUAL', desc: 'Finds metadata values that are less than or equal to a certain numerical value '},
  { value: 'exists', label: 'EXISTS', desc: 'Finds documents that has a certain metadata key defined (Not NULL)'},
  { value: 'not_exists', label: 'NOT EXISTS', desc: 'Finds documents that does not have a certain metadata key defined or that the value of such key is NULL'},
  { value: 'in', label: 'IN', desc: 'Finds documents that that has metadata value of a key that exists in a given list'},
  { value: 'not_in', label: 'NOT IN', desc: 'Finds documents that does not have any metadata value of a key that exists in a given list'},
  { value: 'regex', label: 'REGEX', desc: 'Finds documents that matches defined regular expression'},
  { value: 'contains', label: 'CONTAINS', desc: 'Finds documents that contains certain keywords'},
  { value: 'not_contains', label: 'NOT CONTAINS', desc: 'Finds documents that does not contain certain keywords'},
  { value: 'semantic_search', label: 'SEMANTIC SEARCH', desc: 'Filters documents with an additional layer of semantic search on the specific metadata/entity'},
]