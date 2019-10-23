import React from 'react'
import { Link, graphql } from 'gatsby'
import cn from 'classnames'
import Img from 'gatsby-image'
import { PublishedAt, Layout, SEO } from '../components'

const PageTemplate = ({ data, pageContext, location }) => {
  const { fireblog, site } = data
  const { postsPerPage } = site.siteMetadata
  const { edges, totalCount } = fireblog.posts
  const { pageNumber } = pageContext
  const posts = edges.map(({ node }) => node)

  return (
    <Layout location={location}>
      <SEO
        title={`All posts${pageNumber ? ` - ${pageNumber}` : ''}`}
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />

      <div className="list-posts">
        {posts.map(({ title, slug, publishedAt, teaser, imageFile }) => (
          <div key={slug} className="post">
            {imageFile && imageFile.childImageSharp && (
              <Link className="image" to={`/posts/${slug}`} aria-label={title}>
                <Img
                  fluid={imageFile.childImageSharp.fluid}
                  alt=""
                  objectFit="cover"
                  objectPosition="50% 50%"
                />
              </Link>
            )}

            <h3 className="title">
              <Link to={`/posts/${slug}`}>{title}</Link>
            </h3>

            <PublishedAt date={publishedAt} />

            <p
              className="teaser"
              dangerouslySetInnerHTML={{ __html: teaser }}
            />

            <Link to={`/posts/${slug}`} className="read-more">
              Continuer la lecture
            </Link>
          </div>
        ))}
      </div>

      <ul className="pages">
        {Array.from({ length: Math.ceil(totalCount / postsPerPage) }).map(
          (_, index) => (
            <li key={index}>
              <Link
                className={cn('page', { current: index + 1 === pageNumber })}
                to={index === 0 ? '/' : `/pages/${index + 1}`}
              >
                {index + 1}
              </Link>
            </li>
          ),
        )}
      </ul>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  fragment PaginatedPostsInformation on Fireblog_PostsConnection {
    totalCount
    edges {
      node {
        title
        slug
        publishedAt
        teaser
        image
        imageFile {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }

  query BlogPostsPaginated($first: Int, $after: String) {
    site {
      siteMetadata {
        postsPerPage
      }
    }

    fireblog {
      blog {
        name
      }

      posts(first: $first, after: $after) {
        ...PaginatedPostsInformation
      }
    }
  }
`
