import { type V2_MetaFunction, json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'

import { getPosts } from '~/models/post.server'

export const loader = async () => {
  return json({ posts: await getPosts() })
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Admin page' }
  ]
}

export default function PostsAdminPage() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='pb-3 my-6 mb-2 text-3xl text-center border-b-2'>
        Blog Admin
      </h1>

      <div className='grid grid-cols-4 gap-6 mt-8'>
        <nav className='col-span-4 md:col-span-1'>
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={post.slug}
                  className='text-blue-600 text-md'
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <main className='col-span-4 md:col-span-3'>
          {/* Si usamos aquí el componente Outlet, todas las rutas que sigan después
          de posts/admin se van a renderizar aquí cuando se navegue a ellas, y si por ejemplo,
          tuviéramos la ruta /posts/admin/_index, esta ruta seria la que se renderizaria aquí
          por defecto. */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}
