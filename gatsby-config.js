module.exports = {
  siteMetadata: {
    siteUrl: 'https://javascriptadventures.com',
    title: 'Javascript Adventures',
    description:
      'Exploring the vast javascript landscape with fun learning adventures',
    author: 'Danny Libin'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/src/content/assets`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/content/posts`
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: 'UA-163290364-1',
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false
        // Avoids sending pageview hits from custom paths
        //exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        //pageTransitionDelay: 0,
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Javascript Adventures',
        short_name: 'JS Adventures',
        start_url: '/',
        background_color: '#white',
        theme_color: '#006aff',
        display: 'minimal-ui',
        icon: 'src/content/assets/images/logo.png' // This path is relative to the root of the site.
      }
    },
    // Support for downloading or pre-caching pages, needed for PWAs
    'gatsby-plugin-offline'
  ]
};
