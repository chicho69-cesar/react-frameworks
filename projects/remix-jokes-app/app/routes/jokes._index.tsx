import { json } from '@remix-run/node'
import { Link, isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react'

import { db } from '~/utils/db.server'

export const loader = async () => {
  const count = await db.joke.count()
  const randomRowNumber = Math.floor(Math.random() * count)

  const [randomJoke] = await db.joke.findMany({
    skip: randomRowNumber,
    take: 1,
  })

  if (!randomJoke) {
    throw new Response('No random joke found', {
      status: 404,
    })
  }

  return json({ joke: randomJoke })
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) {
    <div className='error-container'>
      <p>There are no jokes to display.</p>
      <Link to='new'>Add your own</Link>
    </div>
  }

  return (
    <div className='error-container'>
      I did a whoopsies.
    </div>
  )
}

export default function JokesIndexPage() {
  const { joke } = useLoaderData<typeof loader>()

  return (
    <div>
      <p>Here is a random joke: </p>
      <p>{ joke.content }</p>

      <Link to={joke.id}>
        "{joke.name}" Permalink
      </Link>
    </div>
  )
}
