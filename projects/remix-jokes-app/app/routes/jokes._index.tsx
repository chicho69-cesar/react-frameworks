import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

import { db } from '~/utils/db.server'

export const loader = async () => {
  const count = await db.joke.count()
  const randomRowNumber = Math.floor(Math.random() * count)

  const [randomJoke] = await db.joke.findMany({
    skip: randomRowNumber,
    take: 1,
  })

  return json({ joke: randomJoke })
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
