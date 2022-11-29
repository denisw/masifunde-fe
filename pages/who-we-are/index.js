/* eslint-disable function-paren-newline, react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { fetchWhoWeArePage } from '../../api/whoWeAre'
import withLayout from '../../components/withLayout'
import Head from '../../components/Head'
import Button from '../../components/Button'
import * as pages from '../../routes/pages'
import Hero from '../../components/Hero'
import Banner from '../../components/Banner'
import PartnersList, {
  propTypes as partnersListPropTypes,
} from '../../components/PartnersList'
import imagePropTypes from '../../propTypes/image'
import CenteredText from '../../components/CenteredText'
import PageSection from '../../components/PageSection'
import Award from '../../components/Award'
import {
  largeSpacing,
  mediumSpacing,
  extraSmallSpacing,
} from '../../styling/sizes'
import { lgBreakpoint } from '../../styling/breakpoints'
import Link from '../../components/Link'
import TestimonialList from '../../components/TestimonialList'
import CenteredGrid from '../../components/CenteredGrid'

const Image = styled.img`
  width: 100%;
  height: 100%;
`

const CountryContainer = styled.div`
  margin-top: ${extraSmallSpacing};
`

const ImageContainer = styled.div`
  flex-grow: 1;
  height: 270px;

  @media screen and (min-width: ${lgBreakpoint}) {
    height: 400px;
  }
`

const TeamButton = Button.extend`
  margin-top: ${largeSpacing};
`

const CountryMap = ({ buttonText, image, href }) => (
  <CountryContainer className="col-md-6 d-flex flex-column align-items-center">
    <ImageContainer className="d-flex justify-content-center w-100 align-items-center">
      <Image
        className="col-xs-8 col-sm-10 col-md-11 col-lg-10"
        src={image.url}
        alt={image.title}
      />
    </ImageContainer>
    <Link href={href} passHref>
      <TeamButton>{buttonText}</TeamButton>
    </Link>
  </CountryContainer>
)

CountryMap.propTypes = {
  buttonText: PropTypes.string.isRequired,
  image: PropTypes.shape(imagePropTypes).isRequired,
  href: PropTypes.string.isRequired,
}

const StyledPartnerList = styled(PartnersList)`
  margin-bottom: ${mediumSpacing};
`

const AwardsContainer = styled.div`
  margin-top: ${mediumSpacing};
`

const PatronsText = CenteredText.extend`
  margin-bottom: ${mediumSpacing};
`

const WhoWeAre = ({
  title,
  paragraphOneTitle,
  paragraphOneText,
  paragraphTwoTitle,
  paragraphTwoText,
  paragraphThreeTitle,
  paragraphThreeText,
  bannerHeadline,
  bannerText,
  bannerButtonUrl,
  metaDescription,
  metaTitle,
  partnersButtonText,
  teamSaImage,
  teamSaButtonText,
  teamDeImage,
  teamDeButtonText,
  partnersListOne,
  awards,
  patronsHeadline,
  patronsText,
  patronsList,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      backgroundPositionX="70%"
      headline={title}
      imageUrl="/static/images/hero/hero-wer-wir-sind.jpg"
      headlinePlacement="bottom"
      headlineShadow
    />

    <PageSection>
      <h1>{paragraphOneTitle}</h1>
      <CenteredText source={paragraphOneText} />
      <div className="row justify-content-md-center">
        <CountryMap
          href={pages.teamDE}
          buttonText={teamDeButtonText}
          image={teamDeImage}
        />
        <CountryMap
          href={pages.teamSA}
          buttonText={teamSaButtonText}
          image={teamSaImage}
        />
      </div>
    </PageSection>

    <PageSection>
      <h2>{patronsHeadline}</h2>
      <PatronsText source={patronsText} />
      <CenteredGrid withoutContainer>
        <TestimonialList testimonials={patronsList} />
      </CenteredGrid>
    </PageSection>

    <PageSection>
      <h1>{paragraphTwoTitle}</h1>
      <CenteredText source={paragraphTwoText} />
      <StyledPartnerList partnersList={partnersListOne} />
      <Link href={pages.becomePartner} passHref>
        <Button center>{partnersButtonText}</Button>
      </Link>
    </PageSection>

    <PageSection>
      <h1>{paragraphThreeTitle}</h1>
      <CenteredText source={paragraphThreeText} />
      <AwardsContainer>
        {awards.map((award) => (
          <Award key={award.name} {...award} />
        ))}
      </AwardsContainer>
    </PageSection>

    <Banner
      headline={bannerHeadline}
      buttonText={bannerText}
      buttonLink={bannerButtonUrl}
    />
  </div>
)

WhoWeAre.propTypes = {
  title: PropTypes.string.isRequired,
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  paragraphOneTitle: PropTypes.string.isRequired,
  paragraphOneText: PropTypes.string.isRequired,
  paragraphTwoTitle: PropTypes.string.isRequired,
  paragraphTwoText: PropTypes.string.isRequired,
  paragraphThreeText: PropTypes.string.isRequired,
  paragraphThreeTitle: PropTypes.string.isRequired,
  partnersButtonText: PropTypes.string.isRequired,
  teamDeImage: PropTypes.shape(imagePropTypes).isRequired,
  teamDeButtonText: PropTypes.string.isRequired,
  teamSaImage: PropTypes.shape(imagePropTypes).isRequired,
  teamSaButtonText: PropTypes.string.isRequired,
  bannerHeadline: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-typos
  partnersListOne: partnersListPropTypes.partnersList,
  // eslint-disable-next-line react/no-typos
  awards: PropTypes.arrayOf(PropTypes.shape(Award.propTypes)).isRequired,
  bannerText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
  patronsHeadline: PropTypes.string.isRequired,
  patronsText: PropTypes.string.isRequired,
  patronsList: TestimonialList.propTypes.testimonials.isRequired,
}

WhoWeAre.defaultProps = {
  partnersListOne: [],
  partnersListTwo: [],
  metaDescription: undefined,
}

WhoWeAre.getInitialProps = async function initialProps() {
  return fetchWhoWeArePage()
}

export default withLayout(WhoWeAre)
