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

export default function Seo({ title }) {
  const data = useStaticQuery(query)

  return (
    <>
      <title>
        {title} | {data.site.siteMetadata.title}
      </title>

      <link rel='icon' type='image/svg' href='/favicon.svg' />
    </>
  )
}
