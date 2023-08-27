import type { LinksFunction, ActionArgs } from '@remix-run/node'
import { Link, useActionData, useSearchParams } from '@remix-run/react'

import stylesUrl from '~/styles/login.css'
import { db } from '~/utils/db.server'
import { badRequest } from '~/utils/request.server'
import { validateUsername, validatePassword, validateUrl } from '~/validations/users'
import { login, createUserSession } from '~/auth/session.server'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: stylesUrl }
  ]
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData()

  const loginType = form.get('loginType')
  const password = form.get('password')
  const username = form.get('username')
  const redirectTo = validateUrl(
    (form.get('redirectTo') as string) || '/jokes'
  )

  if (
    typeof loginType !== 'string' ||
    typeof password !== 'string' ||
    typeof username !== 'string'
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: 'Form not submitted correctly.'
    })
  }

  const fields = { loginType, password, username }
  const fieldErrors = {
    password: validatePassword(password),
    username: validateUsername(username)
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null
    })
  }

  switch (loginType) {
    case 'login': {
      const user = await login({ username, password })

      if (!user) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: 'Username/Password combination is incorrect'
        })
      }

      return createUserSession(user.id, redirectTo)
    }

    case 'register': {
      const userExists = await db.user.findFirst({
        where: { username }
      })

      if (userExists) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: `User with username ${username} already exists`
        })
      }

      return badRequest({
        fieldErrors: null,
        fields,
        formError: 'Not implemented'
      })
    }

    default: {
      return badRequest({
        fieldErrors: null,
        fields,
        formError: 'Login type invalid'
      })
    }
  }
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>()
  const [searchParams] = useSearchParams()

  return (
    <div className='container'>
      <div className='content' data-light=''>
        <h1>Login</h1>

        <form method='post'>
          <input
            type='hidden'
            name='redirectTo'
            value={searchParams.get('redirectTo') ?? undefined}
          />

          <fieldset>
            <legend className='sr-only'>
              Login or Register?
            </legend>

            <label>
              <input
                type='radio'
                name='loginType'
                value='login'
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData?.fields?.loginType === 'login'
                }
              />{' '}
              Login
            </label>

            <label>
              <input
                type='radio'
                name='loginType'
                value='register'
                defaultChecked={
                  actionData?.fields?.loginType === 'register'
                }
              />{' '}
              Register
            </label>
          </fieldset>

          <div>
            <label htmlFor='username-input'>Username</label>
            <input
              type='text'
              id='username-input'
              name='username'
              defaultValue={actionData?.fields?.username}
              aria-invalid={Boolean(
                actionData?.fieldErrors?.username
              )}
              aria-errormessage={
                actionData?.fieldErrors?.username
                  ? 'username-error'
                  : undefined
              }
            />

            {actionData?.fieldErrors?.username && (
              <p
                className='form-validation-error'
                id='username-error'
                role='alert'
              >
                {actionData.fieldErrors.username}
              </p>
            )}
          </div>

          <div>
            <label htmlFor='password-input'>Password</label>
            <input
              type='password'
              name='password'
              id='password-input'
              defaultValue={actionData?.fields?.password}
              aria-invalid={Boolean(actionData?.fieldErrors?.password)}
              aria-errormessage={
                actionData?.fieldErrors?.password
                  ? 'password-error'
                  : undefined
              }
            />

            {actionData?.fieldErrors?.password && (
              <p
                className='form-validation-error'
                id='password-error'
                role='alert'
              >
                {actionData.fieldErrors.password}
              </p>
            )}
          </div>

          <div id='form-error-message'>
            {actionData?.formError && (
              <p
                className='form-validation-error'
                role='alert'
              >
                {actionData.formError}
              </p>
            )}
          </div>

          <button type='submit' className='button'>
            Submit
          </button>
        </form>
      </div>

      <div className='links'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>

          <li>
            <Link to='/jokes'>Jokes</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
