import { graphql } from 'gatsby'

import Page from '../templates/page'

export default Page
export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        postsPerPage
      }
    }

    fireblog {
      blog {
        name
      }

      posts(first: 5) {
        ...PaginatedPostsInformation
      }
    }
  }
`
