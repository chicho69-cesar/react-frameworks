import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const query = graphql`
  query {
    allFile {
      nodes {
        name
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default function useSiteMetadata() {
  const data = useStaticQuery(query)

  return {
    title: data.site.siteMetadata.title,
    ...data.site.siteMetadata
  }
}
