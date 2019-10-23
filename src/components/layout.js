import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { GoTop, RecentPosts, Socials } from '.'

const Layout = ({ children, className }) => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => (
        <div className="layout">
          <header>
            <h1>
              <Link to={`/`}>{data.fireblog.blog.title}</Link>
            </h1>
          </header>

          <main className={className}>{children}</main>

          <div className="menu">
            <RecentPosts />
            <Socials />
          </div>

          <GoTop />
        </div>
      )}
    />
  )
}

export default Layout

const detailsQuery = graphql`
  query {
    fireblog {
      blog {
        title: name
      }
    }
  }
`
