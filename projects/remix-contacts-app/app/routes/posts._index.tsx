import { json } from '@remix-run/node'
import type { V2_MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

import { getPosts } from '~/models/post.server'
import Main from '~/components/Main'

export const loader = async () => {
  return json({ posts: await getPosts() })
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Posts' }
  ]
}

export default function PostsPage() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <Main>
      <h1 className='text-center text-slate-700 text-3xl'>Posts</h1>

      <div>
        <Link
          to='admin'
          className='block text-center text-white bg-red-500 px-4 py-2 my-3 rounded-md shadow-md uppercase'
        >
          Admin
        </Link>

        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to={post.slug}
                className='text-blue-600 text-xl'
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Main>
  )
}
