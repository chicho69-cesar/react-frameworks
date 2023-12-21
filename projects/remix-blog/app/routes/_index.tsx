import type { V2_MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

import Main from '~/components/Main'

/* Cuando exportamos una función meta en una ruta debemos de regresar un array de objetos
con las configuraciones de los meta tags que queremos que aparezcan en el navegador. */
export const meta: V2_MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

/* Componente renderizado en la ruta / */
export default function HomePage() {
  return (
    <Main>
      <div className='font-[system-ui] leading-4'>
        <div className='mx-auto text-center max-w-7xl'>
          <h1 className='text-3xl font-bold text-slate-700'>Welcome to Remix</h1>
          
          <Link
            to='/posts'
            className='mt-8 text-xl text-blue-600'
          >
            Read the blog posts
          </Link>
        </div>
      </div>
    </Main>
  )
}
