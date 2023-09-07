import React from 'react'
import { graphql } from 'gatsby'

import Layout from '@/components/Layout'
import Seo from '@/components/Seo'

/* Las queries exportadas mandan la data a la page */
export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          slug
          title
        }
        id
        excerpt
        parent {
          ... on File {
            modifiedTime(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  }
`

/* Se recibe la data de la query */
function BlogPage({ data }) {
  return (
    <Layout pageTitle='My Blog Posts'>
      {data.allMdx.nodes.map((post) => (
        <article key={post.id}>
          <h2>{post.frontmatter.title}</h2>
          <p>Posted: {post.frontmatter.date}</p>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </Layout>
  )
}

export function Head({ data }) {
  console.log(data)

  return (
    <>
      <Seo title='My Blog Posts' />
    </>
  )
}

export default BlogPage
