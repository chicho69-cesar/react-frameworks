import * as React from 'react'

import Layout from '@/components/Layout'
import Seo from '@/components/Seo'

function BlogPostPage() {
  return (
    <Layout pageTitle='Super Cool Blog Posts'>
      <p>My blog post contents will go here (eventually).</p>
    </Layout>
  )
}

export function Head() {
  return (
    <Seo title='Super Cool Blog Posts' />
  )
}

export default BlogPostPage
