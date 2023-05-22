export const dslFormat = `{
    "domain": enum,
    "query": string,
    "advanced_filter": {
        "match": [ {
            "key": string,
            "operator": enum,
            "value": string,
            "data_type": string,
            "model": string,
            "scoring_algorithm": string,
            "top_n": number,
            "score_threshold": number
        } ]
    }
  }
`

export const dslExample = `{
  "domain": "recruitment",
  "query": "Senior data engineer",
  "advanced_filter": {
      "match": [ 
      {
          "key": "name",
          "operator": "contains",
          "value": "Salsa",
          "data_type": "text"
      }, 
      {
          "key": "COMPANY",
          "operator": "equals",
          "value": "Telkom Indonesia",
          "data_type": "text"
      },
      {
          "key": "SKILL",
          "operator": "regex",
          "value": "python|java|kubernetes",
          "data_type": "text"
      },
      {
          "key": "projects",
          "operator": "semantic_search",
          "value": "created deployments in a linux environment",
          "data_type": "long text",
          "model": "SBERT_MSMARCO",
          "scoring_algorithm": "COSINE_SIMILARITY",
          "top_n": 10,
          "score_threshold": 0.5
      } ]
  }
}
`

export const repoRoles = [
  {
    operation: 'Read the metadata (such as name, description, visibility) of the repository ',
    owner: true,
    admin: true,
    uploader: true,
    viewer: true,
  },
  {
    operation: 'Read public documents in the repository',
    owner: true,
    admin: true,
    uploader: true,
    viewer: true,
  },
  {
    operation: 'Accept viewer access to private documents in the repository',
    owner: true,
    admin: true,
    uploader: true,
    viewer: true,
  },
  {
    operation: 'Accept editor access to private documents in the repository',
    owner: true,
    admin: true,
    uploader: true,
    viewer: false,
  },
  {
    operation: 'Upload documents to the repository',
    owner: true,
    admin: true,
    uploader: true,
    viewer: false,
  },
  {
    operation: 'Modify the collaborators of the document',
    owner: true,
    admin: true,
    uploader: false,
    viewer: false,
  },
  {
    operation: 'Automatically become the owner of all documents in the repository',
    owner: true,
    admin: true,
    uploader: false,
    viewer: false,
  },
  {
    operation: 'Modify the uploaders and viewers of the repository',
    owner: true,
    admin: true,
    uploader: false,
    viewer: false,
  },
  {
    operation: 'Modify the metadata (such as name, description, visibility) of the repository',
    owner: true,
    admin: true,
    uploader: false,
    viewer: false,
  },
  {
    operation: 'Modify the admins of the repository',
    owner: true,
    admin: false,
    uploader: false,
    viewer: false,
  },
  {
    operation: 'Delete the repository',
    owner: true,
    admin: false,
    uploader: false,
    viewer: false,
  },
]

export const docRoles = [
  {
    operation : 'Read the metadata (such as name, description, visibility) of the document ',
    owner: true,
    editor: true,
    viewer: true,
  },
  {
    operation : 'Read the content of the document',
    owner: true,
    editor: true,
    viewer: true,
  },
  {
    operation : 'Modify the metadata (such as name, description, visibility) of the document',
    owner: true,
    editor: true,
    viewer: false,
  },
  {
    operation : 'Modify the viewers of the document',
    owner: true,
    editor: true,
    viewer: false,
  },
  {
    operation : 'Modify the editors of the document',
    owner: true,
    editor: false,
    viewer: false,
  },
  {
    operation : 'Delete the document',
    owner: true,
    editor: false,
    viewer: false,
  },
]