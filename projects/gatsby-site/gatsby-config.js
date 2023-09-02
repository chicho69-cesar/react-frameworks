/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
    title: 'My first Gatsby site'
  },
  plugins: [
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
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
  ],
}
