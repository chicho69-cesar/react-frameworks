import { type PropsWithChildren } from 'react'
import { type LinksFunction } from '@remix-run/node'
import { Links, LiveReload, Outlet, useRouteError } from '@remix-run/react'

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

function Document({
  children,
  title = 'Remix: So great, it\'s funny!'
}: PropsWithChildren<{ title?: string }>) {
  return (
    <html lang='es'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        <Links />

        <title>{title}</title>
      </head>

      <body>
        {children}
        <LiveReload /> {/* The <LiveReload /> component is useful during 
        development to auto-refresh our browser whenever we make a change. */}
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

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
