import { type LinksFunction } from '@remix-run/node'
import { Links, LiveReload, Outlet } from '@remix-run/react'

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

export default function App() {
  return (
    <html lang='es'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        <Links />

        <title>Remix: So great, it's funny!</title>
      </head>

      <body>
        <Outlet />
        <LiveReload /> {/* The <LiveReload /> component is useful during 
        development to auto-refresh our browser whenever we make a change. */}
      </body>
    </html>
  )
}
