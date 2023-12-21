import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

/* La metadata a la cual accedemos en esta query es la definida en la configuración
de gatsby en el proyecto. */
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
