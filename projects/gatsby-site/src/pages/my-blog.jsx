import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

export const query = graphql`
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

function BlogPage({ data }) {
  return (
    <Layout pageTitle='My Blog Posts'>
      <ul>
        {data.allFile.nodes.map((post) => (
          <li key={post.name}>
            {post.name}
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export function Head({ data }) {
  console.log(data.site.siteMetadata.title)

  return (
    <>
      <Seo title='My Blog Posts' />
    </>
  )
}

export default BlogPage
