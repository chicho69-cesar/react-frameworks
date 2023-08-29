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
      <Link
        to='new'
        className='text-white px-4 py-2 bg-blue-500 rounded-md shadow'
      >
        Create a new post
      </Link>
    </p>
  )
}
