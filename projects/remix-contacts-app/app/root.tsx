import styles from '~/app.css'
import stylesheet from '~/tailwind.css'

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
  useNavigation
} from '@remix-run/react'

import { createEmptyContact, getContacts, type ContactRecord } from './data/data'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: stylesheet },
    { rel: 'stylesheet', href: styles },
  ]
}

export const loader: LoaderFunction = async () => {
  const contacts = await getContacts()
  return json({ contacts })
}

export const action: ActionFunction = async () => {
  const contact = await createEmptyContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

export default function App() {
  const { contacts } = useLoaderData<{ contacts: ContactRecord[]}>()
  const navigation = useNavigation()

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
            <Form id='search-form' role='search'>
              <input
                id='q'
                aria-label='Search contacts'
                placeholder='Search'
                type='search'
                name='q'
              />
    
              <div id='search-spinner' aria-hidden hidden={true} />
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
            navigation.state === 'loading' ? 'loading' : ''
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
