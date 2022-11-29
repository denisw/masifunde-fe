import React from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'

import Button from '../Button'
import PageSection from '../PageSection'
import { rem } from '../../styling/typography'
import Link from '../Link'
import Headline from './Headline'
import { propTypes, defaultProps } from './propTypes'
import { background } from './styles'

const OuterContainer = styled(PageSection).attrs({ contained: false })`
  ${background};
  display: flex;
`

const InnerContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: auto;
  min-height: ${rem('350px')};
  padding-top: ${rem('45px')};
  padding-bottom: ${rem('45px')};
`

function BannerWithoutImage({ headline, buttonText, buttonLink, className }) {
  return (
    <OuterContainer className={className}>
      <InnerContainer>
        <Headline>{headline}</Headline>
        <Link href={buttonLink} passHref>
          <Button type="banner">{buttonText}</Button>
        </Link>
      </InnerContainer>
    </OuterContainer>
  )
}

BannerWithoutImage.propTypes = propTypes
BannerWithoutImage.defaultProps = defaultProps

export default BannerWithoutImage
