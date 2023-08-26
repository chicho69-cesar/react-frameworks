import { type ActionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useActionData } from '@remix-run/react'

import { db } from '~/utils/db.server'
import { badRequest } from '~/utils/request.server'
import { validateJokeName, validateJokeContent } from '~/validations/jokes.server'

export const action = async ({ request }: ActionArgs) => {
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

  const joke = await db.joke.create({ data: fields })

  return redirect(`/jokes/${joke.id}`)
}


export default function JokesNewPage() {
  const actionData = useActionData<typeof action>()

  return (
    <div>
      <p>Add your own hilarious joke</p>

      <form method='post'>
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
      </form>
    </div>
  )
}
