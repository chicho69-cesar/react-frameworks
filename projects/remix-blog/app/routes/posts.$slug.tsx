import { json, type LoaderArgs, type V2_MetaFunction } from '@remix-run/node'
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

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Post' },
  ]
}

/* Componente renderizado en la ruta /posts/:slug */
export default function PostsSlugPage() {
  const { post, html } = useLoaderData<typeof loader>()

  return (
    <main className='max-w-4xl mx-auto'>
      <h1 className='pb-3 my-6 text-3xl text-center border-b-2'>
        Some Post: {post.title}
      </h1>

      {/* Con el siguiente código podemos renderizar código html de una cadena de texto. */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  )
}
