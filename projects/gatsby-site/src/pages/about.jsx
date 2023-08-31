import React from 'react'

import Layout from '../components/Layout'

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
      <title>About me</title>
      <link rel='icon' type='image/svg' href='/favicon.svg' />
    </>
  )
}

export default AboutPage
