import Head from 'next/head'
import Link from 'next/link'
// import Script from 'next/script'

import Layout from 'components/layout'

export default function FirstPostPage() {
  return (
    <>
      <Layout>
        <Head>
          <title>First Post</title>
        </Head>

        {/* El componente Script de Next nos ayuda a cargar Scripts externos a 
        nuestra aplicación. */}
        {/* <Script
          src='https://connect.facebook.net/en_US/sdk.js'
          strategy='lazyOnload'
          onLoad={() => {
            console.log('script loaded correctly, window.FB has been populated')
          }}
        /> */}

        <h1>
          First post
        </h1>

        <Link href='/'>Back to home</Link>
      </Layout>
    </>
  )
}
