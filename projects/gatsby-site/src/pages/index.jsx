import React from 'react'

import Layout from '../components/Layout'

function IndexPage() {
  return (
    <Layout pageTitle='Home Page'>
      <p>I'm making this by following the Gatsby Tutorial.</p>
    </Layout>
  )
}

export function Head() {
  return (
    <>
      <title>Home Page</title>
      <link rel='icon' type='image/svg' href='/favicon.svg' />
    </>
  )
}

export default IndexPage
