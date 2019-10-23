import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

// source: https://stackoverflow.com/a/44280814
const toCssName = (str) =>
  str &&
  str
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase()

const SEO = ({
  description,
  lang,
  meta,
  keywords,
  title,
  author,
  slug = '',
}) => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const { site, fireblog } = data

        const { blog } = fireblog

        const { siteUrl, theme } = site.siteMetadata

        const metaDescription = description || blog.description
        const metaAuthor = author || (blog.owner && blog.owner.name)
        const metaSiteUrl = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`
        const path = slug ? `posts/${slug}` : slug

        const cssVariables = Object.entries(theme).reduce(
          (acc, [key, value]) => `${acc}\n  --${toCssName(key)}: ${value};`,
          '',
        )

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${blog.title}`}
            link={[
              {
                rel: 'canonical',
                href: `${metaSiteUrl}${path}`,
              },
              {
                rel: 'amphtml',
                href: `${metaSiteUrl}amp/${path}`,
              },
            ]}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `article`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: metaAuthor,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : [],
              )
              .concat(meta)}
          >
            <style type="text/css">{`:root { ${cssVariables} }`}</style>
          </Helmet>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    fireblog {
      blog {
        title: name
        description
        owner {
          name
        }
      }
    }

    site {
      siteMetadata {
        siteUrl
        theme {
          fg
          fgLight
          primary
          a11yPrimary
          secondary
          fontFamily
        }
      }
    }
  }
`
