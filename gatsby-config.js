require('dotenv').config()

const path = require('path')

const SITE_TITLE = 'fireblog Démo Blog'
const SITE_SHORTNAME = 'fireblog'
const SITE_URL = 'https://fireblog-gatsby-starter.netlify.com/'
const POSTS_PER_PAGE = 5
const SOCIALS = [
  {
    code: 'facebook',
    link: 'https://www.facebook.com/myname',
  },
  {
    code: 'instagram',
    link: 'https://www.instagram.com/myname/',
  },
]
const THEME = {
  fg: '#000000',
  fgLight: 'white',
  background: 'white',
  primary: 'rgb(250, 164, 63)',
  a11yPrimary: 'rgb(166, 103, 29)',
  secondary: 'rgb(249, 53, 124)',
  fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
}

module.exports = {
  siteMetadata: {
    title: SITE_TITLE,
    siteUrl: SITE_URL,
    socials: SOCIALS,
    theme: THEME,
    postsPerPage: POSTS_PER_PAGE,
  },
  plugins: [
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Fireblog',
        fieldName: 'fireblog',
        url: process.env.FIREBLOG_GRAPHQL_ENDPOINT,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `{
          fireblog {
            blog {
              title: name
              description
            }
          }
        }`,
        setup: ({
          query: {
            fireblog: { blog },
          },
          ...rest
        }) => ({
          ...blog,
          siteUrl: SITE_URL,
          site_url: SITE_URL,
          ...rest,
        }),
        feeds: [
          {
            serialize: ({ query: { fireblog } }) => {
              return fireblog.posts.edges.map(({ node }) => {
                const { title, teaser, publishedAt, slug, content } = node

                return {
                  title,
                  description: teaser,
                  date: new Date(+publishedAt),
                  url: `${SITE_URL}/posts/${slug}`,
                  guid: `${SITE_URL}/posts/${slug}`,
                  custom_elements: [{ 'content:encoded': content }],
                }
              })
            },
            query: `
            {
              fireblog {
                posts {
                  edges {
                    node {
                      title
                      slug
                      publishedAt
                      teaser
                      content
                    }
                  }
                }
              }
            }`,
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: SITE_TITLE,
        short_name: SITE_SHORTNAME,
        start_url: `/`,
        background_color: THEME.background,
        theme_color: THEME.primary,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-html2amp',
      options: {
        files: ['posts/**/index.html', 'index.html'],
        gaConfigPath: 'gaConfig.json',
        dist: 'public/amp',
        serviceWorker: {
          src: `${SITE_URL}sw.js`,
          'data-iframe-src': `${SITE_URL}amp-install-serviceworker.html`,
          layout: 'nodisplay',
        },
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        disable: false,
        src: `https://cdn.iframe.ly/embed.js?api_key=${process.env.IFRAMELY_API_KEY}`,
        // we don't use onLoad because we need the script to be called for each page change
        // so we implement the script in gatsby-browser "onRouteUpdate" hook
      },
    },
  ],
}
