import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { MdArrowDropUp } from 'react-icons/md'

const onScrollTop = () => {
  if (typeof window === 'undefined') return

  window.scrollTo(0, 0)
}

const GoTop = ({ className }) => {
  const [showGoTopButton, setShowGoTopButton] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowGoTopButton(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (typeof window === 'undefined') return null

  return (
    <button
      className={cn('gotop', className)}
      onClick={onScrollTop}
      type="button"
      aria-label="Go on top of the page"
      style={{
        visibility: showGoTopButton ? 'inherit' : 'hidden',
      }}
    >
      <MdArrowDropUp />
    </button>
  )
}

export default GoTop
