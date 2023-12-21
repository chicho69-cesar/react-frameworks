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
  useNavigation,
  useSubmit
} from '@remix-run/react'
import { useEffect, useState } from 'react'

import { createEmptyContact, getContacts, type ContactRecord } from './data/data'

/* Exportamos la función links para definir los links en el head de la aplicación. */
export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: stylesheet },
    { rel: 'stylesheet', href: styles },
  ]
}

/* Exportamos la función loader para cargar los datos de la aplicación. */
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const contacts = await getContacts(q)

  return json({ contacts })
}

/* Exportamos la función action para crear un nuevo contacto. */
export const action: ActionFunction = async () => {
  const contact = await createEmptyContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

export default function App() {
  /* Usamos la información exportada por la función loader. */
  const { contacts, q } = useLoaderData<{
    contacts: ContactRecord[]
    q: string | null
  }>()
  /* Usamos el hook useNavigation para saber el estado de la navegación. Ya sea loading, 
  idle o submitting. */
  const navigation = useNavigation()
  /* Usamos el hook useSubmit para poder enviar acciones de formularios mediante esta 
  función. */
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
                /* El evento onChange del Form se ejecuta cada que el valor de un elemento
                del Form se modifica. */
                const isFirstSearch = q == null
                /* Enviamos el formulario con la función submit y le decimos que haga el
                replace cuando no sea la primera búsqueda. Además el método
                por defecto de la función submit y de los Form es GET por lo que
                la función que se ejecutara es el loader y no el action. */
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

            {/* Ejecutamos la acción de la ruta al hacer submit en el Form. */}
            <Form method='post'>
              <button type='submit'>New</button>
            </Form>
          </div>

          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    {/* El componente NavLink de Remix es igual al componente Link, la unica
                    diferencia es que el NavLink tiene un atributo className que indica si
                    la ruta actual es la ruta que está activa. */}
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
