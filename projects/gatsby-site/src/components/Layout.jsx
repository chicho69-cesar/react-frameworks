import * as styles from './Layout.module.css'

import React from 'react'
import { Link } from 'gatsby'

export default function Layout({ children, pageTitle }) {
  return (
    <div className={styles.container}>
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
