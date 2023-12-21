// En gatsby aun es necesario importar React en las paginas
import * as React from 'react'
import { Link } from 'gatsby'

/* Empleamos el alias @ para importar elementos del directorio src */
import Seo from '@/components/Seo'

/**
 * @typedef {Object} NotFoundStyles
 * @property {React.CSSProperties} pageStyles - Page Styles
 * @property {React.CSSProperties} headingStyles - Heading Styles
 * @property {React.CSSProperties} paragraphStyles - Paragraph Styles
 * @property {React.CSSProperties} codeStyles - Code Styles
 */

/** @type {NotFoundStyles} */
const styles = {
  pageStyles: {
    color: '#232129',
    padding: '96px',
    fontFamily: '-apple-system, Roboto, sans-serif, serif',
  },
  headingStyles: {
    marginTop: 0,
    marginBottom: 64,
    maxWidth: 320,
  },
  paragraphStyles: {
    marginBottom: 48,
  },
  codeStyles: {
    color: '#8A6534',
    padding: 4,
    backgroundColor: '#FFF4DB',
    fontSize: '1.25rem',
    borderRadius: 4,
  }
}

function NotFoundPage() {
  return (
    <main style={styles.pageStyles}>
      <h1 style={styles.headingStyles}>Page not found</h1>

      <p style={styles.paragraphStyles}>
        Sorry 😔, we couldn’t find what you were looking for.
        <br />

        {process.env.NODE_ENV === 'development' ? (
          <>
            <br />
            Try creating a page in <code style={styles.codeStyles}>src/pages/</code>.
            <br />
          </>
        ) : null}
        <br />

        <Link to='/'>Go home</Link>.
      </p>
    </main>
  )
}

/* Al exportar el componente Head en las paginas de nuestro proyecto gatsby, es lo que
se renderiza en el elemento head de nuestro html. */
export function Head() {
  return (
    <>
      <Seo title='Not found' />
    </>
  )
}

/* La exportación por defecto de un componente es el componente principal, que sera
renderizado en la pagina a la cual se accede del directorio pages. */
export default NotFoundPage
