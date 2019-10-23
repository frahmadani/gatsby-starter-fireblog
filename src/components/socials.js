import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'

const getIconElement = (code) => {
  switch (code.toLowerCase()) {
    case 'facebook':
      return FaFacebookSquare
    case 'instagram':
      return FaInstagram
    default:
      return null
  }
}

const Socials = () => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={({
        site: {
          siteMetadata: { socials },
        },
      }) => {
        if (socials.length === 0) return null

        return (
          <div className="block socials">
            <h3>Rejoins-nous</h3>
            <ul className="list">
              {socials.map(({ code, link }) => (
                <li key={link}>
                  <a href={link} aria-label={code}>
                    {React.createElement(getIconElement(code))}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
      }}
    />
  )
}

export default Socials

const detailsQuery = graphql`
  query {
    site {
      siteMetadata {
        socials {
          code
          link
        }
      }
    }
  }
`
