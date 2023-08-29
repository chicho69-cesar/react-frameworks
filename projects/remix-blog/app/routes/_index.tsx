import type { V2_MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

import Main from '~/components/Main'

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function HomePage() {
  return (
    <Main>
      <div className='font-[system-ui] leading-4'>
        <div className='mx-auto max-w-7xl text-center'>
          <h1 className='text-3xl font-bold text-slate-700'>Welcome to Remix</h1>
          
          <Link
            to='/posts'
            className='text-xl text-blue-600 mt-8'
          >
            Read the blog posts
          </Link>
        </div>
      </div>
    </Main>
  )
}
