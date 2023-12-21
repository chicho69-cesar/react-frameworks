import Layout from 'components/layout'

/* La pagina 500 es la que se renderiza cuando existe un error 500 en la app. */
export default function Custom500() {
  return (
    <Layout>
      <h1>500 - Internal Server Error</h1>
    </Layout>
  )
}
