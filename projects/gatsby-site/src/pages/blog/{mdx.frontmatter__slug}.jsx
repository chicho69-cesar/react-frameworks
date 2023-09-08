import * as React from 'react'
import { graphql } from 'gatsby'
// import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Layout from '@/components/Layout'
import Seo from '@/components/Seo'

export const query = graphql`
  query MyQuery($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        hero_image_alt
        hero_image_credit_text
        hero_image_credit_link
        hero_image
      }
    }
  }
`

function BlogPostPage({ data, children }) {
  // const image = getImage(data.mdx.frontmatter.hero_image)
  const image = data.mdx.frontmatter.hero_image

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>{data.mdx.frontmatter.date}</p>

      {/* <GatsbyImage
        image={image}
        alt={data.mdx.frontmatter.hero_image_alt}
      /> */}
      
      <img
        src={image}
        width='500'
        alt={data.mdx.frontmatter.hero_image_alt}
      />

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
