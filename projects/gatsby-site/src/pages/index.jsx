import * as React from 'react'

function IndexPage() {
  return (
    <main>
      <h1>Welcome to my Gatsby site!!!</h1>
      <p>I'm making this by following the Gatsby Tutorial.</p>
    </main>
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
