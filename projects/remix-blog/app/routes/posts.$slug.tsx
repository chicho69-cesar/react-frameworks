import { json, type LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import invariant from 'tiny-invariant'
import { marked } from 'marked'

import { getPost } from '~/models/post.server'

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, 'slug is required')

  const post = await getPost(params.slug)
  invariant(post, `Post not found: ${params.slug}`)

  const html = marked(post.markdown)

  return json({ post, html })
}

export default function PostSlugPage() {
  const { post, html } = useLoaderData<typeof loader>()

  return (
    <main className='mx-auto max-w-4xl'>
      <h1 className='my-6 border-b-2 text-center text-3xl'>
        Some Post: {post.title}
      </h1>

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  )
}
