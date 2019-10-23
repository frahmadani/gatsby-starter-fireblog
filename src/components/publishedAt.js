import React from 'react'
import { MdQueryBuilder } from 'react-icons/md'

const PublishedAt = ({ date }) => {
  return (
    <small className="published-at">
      {date && (
        <>
          <MdQueryBuilder className="icon" />
          {new Date(date).toLocaleDateString()}
        </>
      )}
    </small>
  )
}

export default PublishedAt
