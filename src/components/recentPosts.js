import React from 'react'
import cn from 'classnames'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { PublishedAt } from '.'

const RecentPosts = () => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={({
        fireblog: {
          posts: { edges },
        },
      }) => {
        const posts = (edges || []).map(({ node }) => node)

        if (posts.length === 0) return null

        return (
          <div className="block recent-posts">
            <h3>Articles récents</h3>
            <ul className="list">
              {posts.map(({ title, imageFile, publishedAt, slug }) => (
                <li key={slug}>
                  <Link to={`/posts/${slug}`} className="post">
                    <div className={cn('image', { empty: !imageFile })}>
                      {imageFile && (
                        <Img
                          fluid={imageFile.childImageSharp.fluid}
                          alt=""
                          objectFit="cover"
                          objectPosition="50% 50%"
                        />
                      )}
                    </div>

                    <div className="infos">
                      <h3 className="title">{title}</h3>

                      <PublishedAt date={publishedAt} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      }}
    />
  )
}

export default RecentPosts

const detailsQuery = graphql`
  query {
    fireblog {
      posts(first: 3) {
        edges {
          node {
            title
            slug
            publishedAt
            image
            imageFile {
              childImageSharp {
                fluid(maxWidth: 100, maxHeight: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
