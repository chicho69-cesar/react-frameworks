import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, Link, isRouteErrorResponse, useActionData, useNavigation, useRouteError } from '@remix-run/react'

import { Joke } from '~/components/joke'
import { db } from '~/utils/db.server'
import { badRequest } from '~/utils/request.server'
import { getUserId, requireUserId } from '~/auth/session.server'
import { validateJokeName, validateJokeContent } from '~/validations/jokes'

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request)

  if (!userId) {
    throw new Response('Unauthorized', {
      status: 401,
    })
  }

  return json({})
}

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request)
  const formData = await request.formData()

  const name = formData.get('name')
  const content = formData.get('content')

  if (
    typeof name !== 'string' ||
    typeof content !== 'string'
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: 'Form not submitted correctly',
    })
  }

  const fieldErrors = {
    name: validateJokeName(name),
    content: validateJokeContent(content),
  }

  const fields = { name, content }

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ 
      fieldErrors, 
      fields,
      formError: null,
    })
  }

  const joke = await db.joke.create({ 
    data: { ...fields, jokesterId: userId } 
  })

  return redirect(`/jokes/${joke.id}`)
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 401) {
    return (
      <div className='error-container'>
        <p>You must be logged in to create a joke.</p>
        <Link to='/login'>Login</Link>
      </div>
    )
  }

  return (
    <div className='error-container'>
      Something unexpected went wrong. Sorry about that.
    </div>
  )
}

export default function JokesNewPage() {
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()

  if (navigation.formData) {
    const content = navigation.formData.get('content') as (string | null)
    const name = navigation.formData.get('name') as (string | null)

    if (
      typeof content !== 'string' &&
      typeof name !== 'string' &&
      !validateJokeContent(content) &&
      !validateJokeName(name)
    ) {
      return <Joke
        canDelete={false}
        isOwner
        joke={{ name: name!, content: content! }}
      />
    }
  }

  return (
    <div>
      <p>Add your own hilarious joke</p>

      <Form method='post'>
        <div>
          <label>
            Name:{' '}
            <input
              type='text'
              name='name'
              defaultValue={actionData?.fields?.name}
              autoComplete='off'
              aria-invalid={Boolean(actionData?.fieldErrors?.name)}
              aria-errormessage={
                actionData?.fieldErrors?.name
                  ? 'name-error'
                  : undefined
              }
            />
          </label>

          {actionData?.fieldErrors?.name && (
            <p
              className='form-validation-error'
              id='name-error'
              role='alert'
            >
              {actionData.fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label>
            Content:{' '}
            <textarea
              name='content'
              defaultValue={actionData?.fields?.content}
              autoComplete='off'
              aria-invalid={Boolean(actionData?.fieldErrors?.content)}
              aria-errormessage={
                actionData?.fieldErrors?.content
                  ? 'content-error'
                  : undefined
              }
            />
          </label>

          {actionData?.fieldErrors?.content && (
            <p
              className='form-validation-error'
              id='content-error'
              role='alert'
            >
              {actionData.fieldErrors.content}
            </p>
          )}
        </div>

        <div>
          {actionData?.formError && (
            <p
              className='form-validation-error'
              role='alert'
            >
              {actionData.formError}
            </p>
          )}

          <button type='submit' className='button'>
            Add
          </button>
        </div>
      </Form>
    </div>
  )
}
