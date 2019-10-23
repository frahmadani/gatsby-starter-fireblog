const path = require(`path`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const createBlogPosts = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  let after = ''
  let hasNextPage = true
  let posts = []

  while (hasNextPage) {
    const { errors, data } = await graphql(
      `
        {
          fireblog {
            posts(first: 50, after: "${after}") {
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                cursor
                node {
                  slug
                  title
                }
              }
            }
          }
        }
      `,
    )

    if (errors) throw errors
    const { edges, pageInfo } = data.fireblog.posts
    hasNextPage = pageInfo.hasNextPage
    after = pageInfo.endCursor
    posts = posts.concat(edges.map((post) => post.node))
  }

  posts.forEach(({ slug }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]

    createPage({
      path: `posts/${slug}`,
      component: blogPost,
      context: {
        slug: slug,
        previous,
        next,
      },
    })
  })
}

const createBlogPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const page = path.resolve(`./src/templates/page.js`)

  let after = ''
  let hasNextPage = true
  let cursors = []

  const {
    data: {
      site: {
        siteMetadata: { postsPerPage: first },
      },
    },
  } = await graphql(`
    {
      site {
        siteMetadata {
          postsPerPage
        }
      }
    }
  `)

  while (hasNextPage) {
    const { errors, data } = await graphql(
      `
        {
          fireblog {
            posts(first: ${first}, after: "${after}") {
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        }
      `,
    )

    if (errors) throw errors
    const { pageInfo } = data.fireblog.posts
    hasNextPage = pageInfo.hasNextPage
    after = pageInfo.endCursor
    cursors = cursors.concat(after)
  }

  cursors.forEach((_, index) => {
    if (index === 0) return

    const pageNumber = index + 1

    createPage({
      path: `pages/${pageNumber}`,
      component: page,
      context: {
        pageNumber,
        first,
        after: cursors[index - 1] || null,
      },
    })
  })
}

exports.createPages = (...args) =>
  Promise.all([createBlogPosts(...args), createBlogPages(...args)])

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Fireblog`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  const resolveImage = (url) => {
    if (!url || url.trim().length === 0) return null

    return createRemoteFileNode({
      url,
      store,
      cache,
      createNode,
      createNodeId,
      reporter,
    })
  }

  return createResolvers({
    Fireblog_User: {
      pictureFile: {
        type: 'File',
        resolve: (source, args, context, info) => resolveImage(source.picture),
      },
    },
    Fireblog_Post: {
      imageFile: {
        type: 'File',
        resolve: (source, args, context, info) => resolveImage(source.image),
      },
    },
  })
}
