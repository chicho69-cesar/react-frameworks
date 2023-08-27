import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Link, isRouteErrorResponse, useLoaderData, useParams, useRouteError } from '@remix-run/react'

import { db } from '~/utils/db.server'
import { getUserId, requireUserId } from '~/auth/session.server'

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await getUserId(request)
  const { jokeId } = params

  const joke = await db.joke.findUnique({
    where: { id: jokeId },
  })

  if (!joke) {
    throw new Response('What a joke! Not found.', {
      status: 404,
    })
  }

  return json({
    isOwner: joke.jokesterId === userId,
    joke
  })
}

export const action = async ({ params, request }: ActionArgs) => {
  const form = await request.formData()
  
  if (form.get('intent') !== 'delete') {
    throw new Response(
      `The intent ${form.get("intent")} is not supported`,
      { status: 400 }
    )
  }

  const userId = await requireUserId(request)
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  })

  if (!joke) {
    throw new Response('Can\'t delete what does not exist', {
      status: 404,
    })
  }

  if (joke.jokesterId !== userId) {
    throw new Response(
      'Pssh, nice try. That\'s not your joke',
      { status: 403 }
    )
  }

  await db.joke.delete({ where: { id: params.jokeId } })

  return redirect('/jokes')
}

export function ErrorBoundary() {
  const { jokeId } = useParams()
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 400) {
      return (
        <div className='error-container'>
          What you're trying to do is not allowed.
        </div>
      )
    }

    if (error.status === 403) {
      return (
        <div className='error-container'>
          Sorry, but "{jokeId}" is not your joke.
        </div>
      )
    }

    if (error.status === 404) {
      return (
        <div className='error-container'>
          Huh? What the heck is "{jokeId}"?
        </div>
      )
    }
  }

  return (
    <div className='error-container'>
      There was an error loading joke by the id "${jokeId}".
      Sorry.
    </div>
  )
}

export default function JokesJokeIdPage() {
  const { isOwner, joke } = useLoaderData<typeof loader>()

  return (
    <div>
      <p>Here is your hilarious joke: </p>
      <p>{joke.content}</p>

      <Link to='.'>"{joke.name}" Permalink</Link>

      {isOwner && (
        <form method='post'>
          <button
            type='submit'
            className='button'
            name='intent'
            value='delete'
          >
            Delete
          </button>
        </form>
      )}
    </div>
  )
}
