/* En gatsby el routing dinámico se declara entre llaves la ruta, pero debemos de
declarar en el nombre el recurso de donde se van a extraer cada elemento para construir
cada una de las rutas. En este caso los archivos mdx, donde cada pagina tendrá un id
que lo identifica donde en este caso sera del frontmatter el slug definido en cada
archivo mdx. 

Más información aquí: https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/ */

import * as React from 'react'
import { graphql } from 'gatsby'
// import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Layout from '@/components/Layout'
import Seo from '@/components/Seo'

/* Hacemos una query para traer la información de nuestros archivos mdx que creamos
en la carpeta blog y configuramos con el plugin de mdx y gatsby-source-filesystem. */
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

      <p>
        Photo Credit:{" "}
        <a href={data.mdx.frontmatter.hero_image_credit_link} target='_blank'>
          {data.mdx.frontmatter.hero_image_credit_text}
        </a>
      </p>

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
