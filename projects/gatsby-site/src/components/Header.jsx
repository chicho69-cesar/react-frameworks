import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default function Header() {
  const data = useStaticQuery(query)

  return (
    <header>
      <h1>{data.site.siteMetadata.title}</h1>
    </header>
  )
}
