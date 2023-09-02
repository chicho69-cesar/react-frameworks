import * as React from 'react'
import useSiteMetadata from '../hooks/use-site-metadata'

export default function Header() {
  const { title } = useSiteMetadata()

  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}
