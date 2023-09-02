import React from 'react'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

function AboutPage() {
  return (
    <Layout pageTitle='About Page'>
      <p>Hi there! I'm the proud creator of this site, which I built with Gatsby.</p>
    </Layout>
  )
}

export function Head() {
  return (
    <>
      <Seo title='About me' />
    </>
  )
}

export default AboutPage
