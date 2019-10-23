import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { PublishedAt, Layout, SEO } from '../components'

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const { post } = data.fireblog
  const { previous, next, slug } = pageContext
  const { title, teaser, publishedAt, content, imageFile, author } = post

  return (
    <Layout location={location} className="post full">
      <SEO
        title={title}
        description={teaser}
        author={author.name}
        slug={slug}
      />

      <h1 className="title">{title}</h1>

      <PublishedAt date={publishedAt} />

      {imageFile && (
        <Img
          fluid={imageFile.childImageSharp.fluid}
          alt=""
          objectFit="cover"
          objectPosition="50% 50%"
          className="image"
        />
      )}

      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />

      {author && (
        <div className="author">
          {author.pictureFile && (
            <Img
              fluid={author.pictureFile.childImageSharp.fluid}
              alt=""
              objectFit="cover"
              objectPosition="50% 50%"
              className="avatar"
            />
          )}

          <div className="name">{author.name}</div>
        </div>
      )}

      <ul className="navigation">
        <li>
          {previous && (
            <Link to={`/posts/${previous.slug}`} rel="prev">
              ← {previous.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={`/posts/${next.slug}`} rel="next">
              {next.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    fireblog {
      blog {
        name
      }

      post(slug: $slug) {
        title
        teaser
        publishedAt
        content
        image
        imageFile {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        author {
          name
          picture
          pictureFile {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
