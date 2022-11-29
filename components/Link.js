/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import NextLink from 'next/link'

import { localizeHref } from '../routes/utils'
import useLocale from '../i18n/useLocale'

const Link = ({ children, href, ...rest }) => {
  const locale = useLocale()

  const hrefWithLocale =
    typeof href === 'string'
      ? { pathname: href, query: { locale } }
      : { ...href, query: { ...href.query, locale } }

  return (
    <NextLink {...rest} href={hrefWithLocale} as={localizeHref(href, locale)}>
      {children}
    </NextLink>
  )
}

Link.propTypes = {
  href: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      query: PropTypes.object,
    }),
  ]),
  children: PropTypes.node.isRequired,
}

Link.defaultProps = {
  params: {},
}

export default Link
