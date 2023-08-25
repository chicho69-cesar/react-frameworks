import { Link } from '@remix-run/react'
import type { V2_MetaFunction } from '@remix-run/node'

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Admin page' },
  ]
}

export default function PostsAdminPage() {
  return (
    <p>
      <Link to='new' className='text-blue-600 underline'>
        Create a new post
      </Link>
    </p>
  )
}
