module.exports = {
  siteMetadata: {
    title: 'Javascript Adventures',
    description:
      'Exploring the vast javascript landscape with fun learning adventures',
    author: 'Danny Libin'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/content/assets`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-code-titles',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1000
            }
          },
          'gatsby-remark-prismjs'
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-typescript',
    'gatsby-plugin-graphql-codegen',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Javascript Adventures',
        short_name: 'JS Adventures',
        start_url: '/',
        background_color: '#white',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png' // This path is relative to the root of the site.
      }
    }
    // Support for downloading or pre-caching pages, needed for PWAs
    // "gatsby-plugin-offline",
  ]
};
