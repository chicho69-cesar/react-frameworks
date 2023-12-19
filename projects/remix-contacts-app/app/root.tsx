import styles from '~/app.css'
import stylesheet from '~/tailwind.css'

import { useEffect, useState } from 'react'
import {
  json,
  redirect,
  type ActionFunction,
  type LinksFunction,
  type LoaderFunction
} from '@remix-run/node'
import {
  Form,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSubmit
} from '@remix-run/react'

import { createEmptyContact, getContacts, type ContactRecord } from './data/data'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: stylesheet },
    { rel: 'stylesheet', href: styles },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const contacts = await getContacts(q)

  return json({ contacts })
}

export const action: ActionFunction = async () => {
  const contact = await createEmptyContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

export default function App() {
  const { contacts, q } = useLoaderData<{
    contacts: ContactRecord[]
    q: string | null
  }>()
  const navigation = useNavigation()
  const submit = useSubmit()

  const [query, setQuery] = useState(q || '')

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

  /* useEffect(() => {
    const searchField = document.getElementById('q')

    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || ''
    }
  }, [q]) */

  useEffect(() => {
    setQuery(q || '')
  }, [q])

  return (
    <html lang='es'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />

        <Meta />
        <Links />
      </head>

      <body>
        <div id='sidebar'>
          <h1>Remix Contacts</h1>

          <div>
            <Form
              id='search-form'
              role='search'
              onChange={(e) => {
                const isFirstSearch = q == null
                submit(e.currentTarget, {
                  replace: !isFirstSearch
                })
              }}
            >
              <input
                id='q'
                aria-label='Search contacts'
                className={searching ? 'loading' : ''}
                placeholder='Search'
                type='search'
                name='q'
                // defaultValue={q || ''}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
    
              <div
                id='search-spinner'
                aria-hidden
                hidden={!searching}
              />
            </Form>

            <Form method='post'>
              <button type='submit'>New</button>
            </Form>
          </div>

          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? 'active'
                          : isPending
                            ? 'pending'
                            : ''
                      }
                      to={`contacts/${contact.id}`}
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{' '}

                      {contact.favorite ? (
                        <span>★</span>
                      ) : null}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>

        <div
          className={
            navigation.state === 'loading' && !searching
              ? 'loading'
              : ''
          }
          id='detail'
        >
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
