import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import Layout from '@/components/Layout'
import Seo from '@/components/Seo'

function IndexPage() {
  return (
    <Layout pageTitle='Home Page'>
      <p>I'm making this by following the Gatsby Tutorial.</p>

      {/* <StaticImage
        alt='Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera'
        src='https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg&name=large'
      /> */}

      {/* Utilizamos el componente StaticImage de gatsby-plugin-image
      el cual nos provee de un mejor rendimiento en nuestra pagina. */}
      <StaticImage
        alt='Clifford, a reddish-brown pitbull, dozing in a bean bag chair'
        src='../images/clifford.jpg'
      />
    </Layout>
  )
}

export function Head() {
  return (
    <>
      <Seo title='Home Page' />
    </>
  )
}

export default IndexPage
