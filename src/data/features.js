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