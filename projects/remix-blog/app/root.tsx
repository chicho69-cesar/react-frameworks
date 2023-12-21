import stylesheet from '~/tailwind.css'

import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

/* El archivo root es el punto de entrada de nuestra aplicación en Remix, y si tenemos
nested routing es la ruta raíz de la app. */
export default function App() {
  return (
    <html lang='es'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        
        <Meta /> {/* Añadimos la información generada por las meta functions */}
        <Links /> {/* Añadimos los links generados por las links functions. */}
      </head>

      <body>
        <Outlet /> {/* Outlet es donde se renderizan las nested routes. */}

        <ScrollRestoration /> {/* Restauración del Scroll al navegar. */}
        <Scripts /> {/* Añadimos los scripts generados por las scripts functions. */}
        <LiveReload /> {/* Reiniciar el servidor cuando hay cambios en el código. */}
      </body>
    </html>
  )
}
