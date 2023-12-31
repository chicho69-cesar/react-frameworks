import { type LinksFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

import stylesUrl from '~/styles/index.css'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: stylesUrl }
  ]
}

export default function HomePage() {
  return (
    <div className='container'>
      <div className='content'>
        <h1>
          Remix <span>Jokes!</span>
        </h1>

        <nav>
          <ul>
            <li>
              {/* Navegamos hacia la ruta /jokes */}
              <Link to='jokes'>Read Jokes</Link>
            </li>

            <li>
              <Link reloadDocument to='/jokes.rss'>
                RSS
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
