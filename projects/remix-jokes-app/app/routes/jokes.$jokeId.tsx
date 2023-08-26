import { type LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

import { db } from '~/utils/db.server'

export const loader = async ({ params }: LoaderArgs) => {
  const { jokeId } = params
  const joke = await db.joke.findUnique({
    where: { id: jokeId },
  })

  if (!joke) {
    throw new Error(`Joke with id ${jokeId} not found`)
  }

  return json({ joke })
}


export default function JokesJokeIdPage() {
  const { joke } = useLoaderData<typeof loader>()

  return (
    <div>
      <p>Here is your hilarious joke: </p>
      <p>{joke.content}</p>
      <Link to='.'>"{joke.name}" Permalink</Link>
    </div>
  )
}
