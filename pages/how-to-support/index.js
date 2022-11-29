import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { fetchHowToSupportPage } from '../../api/howToSupport'
import { getLocaleFromQuery } from '../../utils/locale'
import withLayout from '../../components/withLayout'
import * as pages from '../../routes/pages'
import Link from '../../components/Link'
import Head from '../../components/Head'
import Hero from '../../components/Hero'
import Markdown from '../../components/Markdown'
import Button from '../../components/Button'
import Divider from '../../components/Divider'
import { smBreakpoint } from '../../styling/breakpoints'
import CenteredText from '../../components/CenteredText'
import PageSection from '../../components/PageSection'
import RoundedImage from '../../components/RoundedImage'
import Banner from '../../components/Banner'
import campaignPageBannerPropTypes from '../../propTypes/campaignPageBanner'

const SectionContainer = styled(PageSection)`
  display: flex;
`

const SectionImageContainer = styled.a`
  display: none;

  @media (min-width: ${smBreakpoint}) {
    display: block;
  }
`

const SectionImage = RoundedImage.extend`
  max-width: 100%;
  max-height: 240px;
`

const Section = ({
  image,
  title,
  markdown,
  buttonText,
  buttonType,
  buttonLink,
}) => (
  <SectionContainer>
    <Link href={buttonLink} passHref>
      <SectionImageContainer className="col-md-4 offset-lg-1 col-lg-3">
        <SectionImage src={image.url} alt={image.title} />
      </SectionImageContainer>
    </Link>
    <div className="col-md-8 col-lg-7">
      <h3>{title}</h3>
      <Markdown source={markdown} />
      <Link href={buttonLink} passHref>
        <Button type={buttonType}>{buttonText}</Button>
      </Link>
    </div>
  </SectionContainer>
)

Section.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  markdown: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
}

const HowToSupport = ({
  metaTitle,
  metaDescription,
  heroTitle,
  introHeading,
  introMarkdown,
  section1Image,
  section1Title,
  section1Markdown,
  section1ButtonText,
  section2Image,
  section2Title,
  section2Markdown,
  section2ButtonText,
  section3Image,
  section3Title,
  section3Markdown,
  section3ButtonText,
  section4Image,
  section4Title,
  section4Markdown,
  section4ButtonText,
  campaign,
}) => (
  <Fragment>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      backgroundPositionX="80%"
      headline={heroTitle}
      imageUrl="/static/images/hero/hero-pool.jpg"
      headlinePlacement="bottom"
      headlineShadow
    />

    <PageSection>
      <h1>{introHeading}</h1>
      <CenteredText source={introMarkdown} />
    </PageSection>

    <Section
      buttonText={section1ButtonText}
      title={section1Title}
      markdown={section1Markdown}
      image={section1Image}
      buttonType="primary"
      buttonLink={pages.donate}
    />

    <Section
      buttonText={section2ButtonText}
      title={section2Title}
      markdown={section2Markdown}
      image={section2Image}
      buttonType="secondary"
      buttonLink={pages.becomeSponsor}
    />

    <PageSection>
      <Divider color="orange" />
    </PageSection>

    <Section
      buttonText={section3ButtonText}
      title={section3Title}
      markdown={section3Markdown}
      image={section3Image}
      buttonType="secondary"
      buttonLink={pages.becomeVolunteer}
    />

    <Section
      buttonText={section4ButtonText}
      title={section4Title}
      markdown={section4Markdown}
      image={section4Image}
      buttonType="secondary"
      buttonLink={pages.becomePartner}
    />

    <PageSection>
      {campaign.isActive && (
        <Banner
          subHeadline={campaign.bannerSmallTitle}
          headline={campaign.introHeading}
          description={campaign.introMarkdown}
          image={campaign.imageList[0].url}
          buttonLink={pages.campaign}
          buttonText={campaign.bannerButtonText}
        />
      )}
    </PageSection>
  </Fragment>
)

HowToSupport.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  heroTitle: PropTypes.string.isRequired,
  introHeading: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  section1Image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  section1Title: PropTypes.string.isRequired,
  section1Markdown: PropTypes.string.isRequired,
  section1ButtonText: PropTypes.string.isRequired,
  section2Image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  section2Title: PropTypes.string.isRequired,
  section2Markdown: PropTypes.string.isRequired,
  section2ButtonText: PropTypes.string.isRequired,
  section3Image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  section3Title: PropTypes.string.isRequired,
  section3Markdown: PropTypes.string.isRequired,
  section3ButtonText: PropTypes.string.isRequired,
  section4Image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  section4Title: PropTypes.string.isRequired,
  section4Markdown: PropTypes.string.isRequired,
  section4ButtonText: PropTypes.string.isRequired,
  campaign: PropTypes.shape(campaignPageBannerPropTypes).isRequired,
}

HowToSupport.defaultProps = {
  metaDescription: undefined,
}

HowToSupport.getInitialProps = async function getInitialProps({ query }) {
  return fetchHowToSupportPage(getLocaleFromQuery(query))
}

export default withLayout(HowToSupport)
