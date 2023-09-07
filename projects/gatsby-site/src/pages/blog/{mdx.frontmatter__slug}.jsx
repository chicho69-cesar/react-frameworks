import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '@/components/Layout'
import Seo from '@/components/Seo'

export const query = graphql`
  query MyQuery($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`

function BlogPostPage({ data, children }) {
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>{data.mdx.frontmatter.date}</p>
      {children}
    </Layout>
  )
}

export function Head({ data }) {
  return (
    <Seo title={data.mdx.frontmatter.title} />
  )
}

export default BlogPostPage
