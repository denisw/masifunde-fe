import React from 'react'
import PropTypes from 'prop-types'
import { NavItem } from 'reactstrap'
import { withRouter } from 'next/router'
import styled from 'styled-components'

import Button from '../Button'
import Link from '../Link'
import { extraSmallSpacing, smallSpacing } from '../../styling/sizes'
import { lgBreakpoint, mdBreakpoint } from '../../styling/breakpoints'

const activeLinkBorderThickness = '3px'

const StyledButton = styled(Button)`
  font-size: 18px;
`

const StyledAnchor = styled.a`
  font-weight: bold;
  text-align: right;
  white-space: nowrap;
  padding: 0.31rem 0;
  margin-right: ${extraSmallSpacing};

  @media (min-width: ${lgBreakpoint}) {
    margin-right: ${smallSpacing};
  }
  color: inherit !important;
  margin-top: ${(props) => props.activeBorderThickness};
  margin-bottom: ${(props) =>
    props.isActive ? 0 : `${props.activeBorderThickness}`};
  border-bottom: ${(props) =>
    props.isActive
      ? `${props.activeBorderThickness} solid #FE9933 !important`
      : 0};
  @media screen and (max-width: ${mdBreakpoint}) {
    text-align: center;
    margin-right: 0;
  }

  :hover {
    border-bottom: 3px solid ${({ theme }) => theme.pineCone};
    margin-bottom: 0;
  }
`

function NavigationLink({ children, router, href, type }) {
  return (
    <NavItem>
      <Link href={href} passHref prefetch>
        {type === 'link' ? (
          <StyledAnchor
            activeBorderThickness={activeLinkBorderThickness}
            className="nav-link"
            isActive={router.pathname.includes(href)}
          >
            {children}
          </StyledAnchor>
        ) : (
          <StyledButton type="primary">{children}</StyledButton>
        )}
      </Link>
    </NavItem>
  )
}

NavigationLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  router: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['link', 'button']),
}

NavigationLink.defaultProps = {
  type: 'link',
}

export default withRouter(NavigationLink)
