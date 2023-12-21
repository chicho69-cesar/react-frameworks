/* Este archivo de configuración nos permite entre muchas cosas configurar los plugins
de gatsby que tenemos instalados en nuestro proyecto. */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
    title: 'My first Gatsby site'
  },
  plugins: [
    /* Configuramos el plugin gatsby-plugin-alias-imports para poder importar
    los componentes de nuestro proyecto desde el directorio src utilizando el 
    alias @. Esto nos permite tener un código más limpios y menos repetitivo. */
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@': 'src',
        },
        extensions: [
          'js',
          'jsx',
        ]
      }
    },
    /* Configuramos el plugin gatsby-plugin-image para poder utilizar las imágenes
    de gatsby con un mejor rendimiento. */
    'gatsby-plugin-image',
    /* Configuramos el plugin gatsby-plugin-sharp y el plugin gatsby-transformer-sharp, los
    cuales nos ayudan a poder acceder a imágenes del file system a traves de consultas 
    GraphQL en nuestras paginas. */
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    /* Configuramos el plugin gatsby-source-filesystem para poder utilizar los archivos
    del directorio blog desde consultas GraphQL. */
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/blog`
      }
    },
    /* Configuramos el plugin gatsby-plugin-mdx para poder utilizar los archivos
    mdx de nuestro directorio blog. */
    'gatsby-plugin-mdx'
  ],
}
