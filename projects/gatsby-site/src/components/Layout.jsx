import * as styles from './Layout.module.css'

import React from 'react'
import { Link } from 'gatsby'

import useSiteMetadata from '@/hooks/use-site-metadata'

export default function Layout({ children, pageTitle }) {
  const { title } = useSiteMetadata()

  return (
    <div className={styles.container}>
      <header className={styles.siteTitle}>{title}</header>

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

          <li className={styles.navLinkItem}>
            <Link to='/my-blog' className={styles.navLinkText}>
              Blog
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
