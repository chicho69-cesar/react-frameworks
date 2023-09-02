import * as styles from './Layout.module.css'

import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default function Layout({ children, pageTitle }) {
  const data = useStaticQuery(query)

  return (
    <div className={styles.container}>
      <header className={styles.siteTitle}>{data.site.siteMetadata.title}</header>

      <nav>
        <ul className={styles.navLinks}>
          <li className={styles.navLinkItem}>
            <Link to='/' className={styles.navLinkText}>
              Home
            </Link>
          </li>

          <li className={styles.navLinkItem}>
            <Link to='/about' className={styles.navLinkText}>
              About
            </Link>
          </li>
        </ul>
      </nav>

      <main>
        <h1 className={styles.heading}>{pageTitle}</h1>
        {children}
      </main>
    </div>
  )
}
