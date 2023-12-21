import utilStyles from 'styles/utils.module.css'

import Head from 'next/head'

import Date from 'components/date'
import Layout from 'components/layout'
import { getAllPostIds, getPostData } from 'lib/posts'

export default function PostPage({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>

        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

/* La función getStaticPaths se usa para generar las rutas dinámicas. Esta función
nos regresa un array con las paths a traves de las cuales se generaran todas las rutas
que serán disponibles. */
export async function getStaticPaths() {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false,
  }
}

/* La función getStaticProps se usa para obtener las props con la cual se generara la pagina
es decir, nos regresar las props que usara cada ruta creada. Dentro de una ruta dinámica
esta recibe los params exportados por getStaticPaths. Donde por cada param regresara unas
props especificas. */
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)

  return {
    props: {
      postData,
    },
  }
}
