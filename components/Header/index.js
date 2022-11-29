import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container,
} from 'reactstrap'
import styled from 'styled-components'
import T from 'i18n-react'

import * as pages from '../../routes/pages'
import { rem } from '../../styling/typography'
import Link from '../Link'
import NavigationLink from './NavigationLink'

const HeaderWrapper = styled.header`
  background-color: #f4e3d6;
  box-shadow: -1px 1px 1px 1px rgba(250, 242, 230, 0.25);
  font-size: ${rem('16px')};
`

const Logo = styled.img`
  width: 9.5rem;
`

const StyledNavbar = styled(Navbar)`
  padding: 0;

  a {
    text-align: center;
  }
`

const StyledNavbarBrand = styled(NavbarBrand)`
  height: ${(props) => props.height};
  padding-top: 0;
  padding-bottom: 0;
`

class Header extends Component {
  state = {
    isOpen: false,
  }

  toggle = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }))
  }

  render() {
    const { donateText, howToSupportText, whoWeAreText, whatWeDoText, height } =
      this.props

    return (
      <HeaderWrapper className="fixed-top d-flex align-items-center">
        <Container>
          <StyledNavbar color="faded" light expand="md">
            <Link href={pages.index} passHref>
              <StyledNavbarBrand
                height={height}
                className="d-flex align-items-center"
              >
                <Logo src="/static/images/logo.svg" alt="Masifunde Home" />
              </StyledNavbarBrand>
            </Link>
            <NavbarToggler
              title={T.translate('header.openNavigation')}
              onClick={this.toggle}
            />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto d-flex align-items-center" navbar>
                <NavigationLink type="link" href={pages.whatWeDo}>
                  {whatWeDoText}
                </NavigationLink>
                <NavigationLink type="link" href={pages.whoWeAre}>
                  {whoWeAreText}
                </NavigationLink>
                <NavigationLink type="link" href={pages.howToSupport}>
                  {howToSupportText}
                </NavigationLink>
                <NavigationLink type="button" href={pages.donate}>
                  {donateText}
                </NavigationLink>
              </Nav>
            </Collapse>
          </StyledNavbar>
        </Container>
      </HeaderWrapper>
    )
  }
}

export const propTypes = {
  whatWeDoText: PropTypes.string.isRequired,
  whoWeAreText: PropTypes.string.isRequired,
  howToSupportText: PropTypes.string.isRequired,
  donateText: PropTypes.string.isRequired,
}

Header.propTypes = {
  ...propTypes,
  height: PropTypes.string.isRequired,
}

export default Header
