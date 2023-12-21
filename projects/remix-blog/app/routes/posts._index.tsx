import { json } from '@remix-run/node'
import type { V2_MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

import { getPosts } from '~/models/post.server'
import Main from '~/components/Main'

/* La función loader se ejecuta antes de que la ruta sea renderizada y esta función regresa
la data que se va a utilizar en la ruta. Es decir, esta función carga la data que usara
la pagina, algo asi como lo que hace getServerSideProps o getStaticProps en Next. */
export const loader = async () => {
  return json({ posts: await getPosts() })
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Posts' }
  ]
}

/* Componente renderizado en la ruta /posts */
export default function PostsPage() {
  /* El hook useLoaderData nos ayuda a obtener la data que nos manda la función loader. */
  const { posts } = useLoaderData<typeof loader>()

  return (
    <Main>
      <h1 className='text-3xl text-center text-slate-700'>Posts</h1>

      <div>
        <Link
          to='admin'
          className='block px-4 py-2 my-3 text-center text-white uppercase bg-red-500 rounded-md shadow-md'
        >
          Admin
        </Link>

        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to={post.slug}
                className='text-xl text-blue-600'
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
