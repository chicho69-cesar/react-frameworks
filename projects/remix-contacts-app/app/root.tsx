import stylesheet from '~/tailwind.css'
import styles from '~/app.css'

import {
  json,
  type LinksFunction,
  type LoaderFunction
} from '@remix-run/node'
import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'

import { type ContactRecord, getContacts } from './data/data'

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

export default function App() {
  const { contacts } = useLoaderData<{ contacts: ContactRecord[]}>()

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
                    <Link to={`contacts/${contact.id}`}>
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
                    </Link>
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

        <div id='detail'>
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
