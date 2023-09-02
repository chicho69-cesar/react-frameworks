import * as React from 'react'
import useSiteMetadata from '../hooks/use-site-metadata'

export default function Seo({ title }) {
  const { title: siteTitle } = useSiteMetadata()

  return (
    <>
      <title>
        {title} | {siteTitle}
      </title>

      <link rel='icon' type='image/svg' href='/favicon.svg' />
    </>
  )
}
