import type { Joke as JokeType } from '@prisma/client'
import { Form, Link } from '@remix-run/react'

interface Props {
  canDelete?: boolean
  isOwner: boolean
  joke: Pick<JokeType, 'content' | 'name'>
}

export function Joke({ canDelete = true, isOwner, joke }: Props) {
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{joke.content}</p>

      <Link to='.'>"{joke.name}" Permalink</Link>

      {isOwner && (
        <Form method='post'>
          <button
            type='submit'
            className='button'
            disabled={!canDelete}
            name='intent'
            value='delete'
          >
            Delete
          </button>
        </Form>
      )}
    </div>
  )
}
