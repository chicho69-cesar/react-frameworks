import { type PropsWithChildren } from 'react'
import type { LinksFunction, V2_MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  isRouteErrorResponse,
  useRouteError
} from '@remix-run/react'

import globalStylesUrl from '~/styles/global.css'
import globalMediumStylesUrl from '~/styles/global-medium.css'
import globalLargeStylesUrl from '~/styles/global-large.css'

export const links: LinksFunction = () => {
  return [
    { 
      rel: 'stylesheet', 
      href: globalStylesUrl 
    },
    {
      rel: 'stylesheet',
      href: globalMediumStylesUrl,
      media: 'print, (min-width: 640px)'
    },
    {
      rel: 'stylesheet',
      href: globalLargeStylesUrl,
      media: 'print, (min-width: 1024px)'
    }
  ]
}

export const meta: V2_MetaFunction = () => {
  const description = 'Learn Remix and laugh at the same time!'

  return [
    { name: 'description', content: description },
    { name: 'twitter:description', content: description },
    { title: 'Remix: So great, it\'s funny!' }
  ]
}

function Document({ children, title }: PropsWithChildren<{ title?: string }>) {
  return (
    <html lang='es'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='keywords' content='Remix,Jokes,React,TypeScript' />
        <meta name='twitter:image' content='https://remix-jokes.lol/social.png' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content='@chicho69_cesar' />
        <meta name='twitter:site' content='@chicho69_cesar' />
        <meta name='twitter:title' content={'Remix: So great, it\'s funny!'} />

        <Meta />
        <Links />

        {title && (
          <title>{title}</title>
        )}
      </head>

      <body>
        {children}

        <Scripts /> {/* Scripts es muy importante para que las rutas y las navegaciones
        entre las rutas se haga sin hacer full refresh de la página. */}
        <LiveReload /> {/* The <LiveReload /> component is useful during 
        development to auto-refresh our browser whenever we make a change. */}
      </body>
    </html>
  )
}

/* Cuando en una ruta exportamos un componente llamado ErrorBoundary, este componente
sera ejecutado cuando se produzca un error en la ruta. */
export function ErrorBoundary() {
  /* El hook useRouteError nos permite obtener el error que se produjo en la ruta. */
  const error = useRouteError()

  /* Si el error es un Route Error Response. Como por ejemplo un 404 */
  if (isRouteErrorResponse(error)) {
    return (
      <Document
        title={`${error.status} ${error.statusText}`}
      >
        <div className='error-container'>
          <h1>
            {error.status} {error.statusText}
          </h1>
        </div>
      </Document>
    )
  }

  const errorMessage = 
    error instanceof Error
      ? error.message
      : 'Something went wrong'

  return (
    <Document title='Uh-oh!'>
      <div className='error-container'>
        <h1>App Error</h1>
        <pre>{errorMessage}</pre>
      </div>
    </Document>
  )
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}
