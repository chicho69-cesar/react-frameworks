import { LiveReload, Outlet } from '@remix-run/react'

export default function App() {
  return (
    <html lang='es'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

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
