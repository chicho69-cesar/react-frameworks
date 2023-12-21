import utilsStyles from 'styles/utils.module.css'

import { clsx } from 'clsx'
import Head from 'next/head'
import Link from 'next/link'

import Date from 'components/date'
import Layout, { siteTitle } from 'components/layout'
import { getSortedPostsData } from 'lib/posts'

export default function HomePage({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilsStyles.headingMd}>
        <p>Hello 🤙, I&apos;m Cesar Villalobos Olmos, a full-stack developer.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={clsx({
        [utilsStyles.headingMd]: true,
        [utilsStyles.padding1px]: true
      })}>
        <h2 className={utilsStyles.headingLg}>Blog</h2>
        <ul className={utilsStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id} className={utilsStyles.listItem}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>

              <br />

              <small className={utilsStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

/* Cuando usamos la función getStaticProps en una ruta que no es dinámica, solamente nos
regresa las props que esta pagina en especifico utilizara. */
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData,
    },
  }
}
