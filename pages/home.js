import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { fetchNewestBlogPosts } from '../api/blog'
import { fetchHomePage } from '../api/home'
import withLayout from '../components/withLayout'
import Head from '../components/Head'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import Carousel from '../components/Carousel'
import portraitPropTypes from '../propTypes/portrait'
import Stat from '../components/Stat'
import BlogPostCard from '../components/Blog/BlogPostCard'
import EmbeddedVideo from '../components/EmbeddedVideo'
import PageSection from '../components/PageSection'
import StatList from '../components/StatList'
import { mdBreakpoint } from '../styling/breakpoints'
import { mediumSpacing, smallSpacing } from '../styling/sizes'
import { getLocaleFromQuery } from '../utils/locale'
import * as pages from '../routes/pages'
import campaignPageBannerPropTypes from '../propTypes/campaignPageBanner'
import announcementPropTypes from '../propTypes/announcement'

const BlogPostList = styled.ul`
  list-style: none;
  padding: 0;
`

const BlogPostListItem = styled.li`
  margin-bottom: ${smallSpacing};

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: ${mdBreakpoint}) {
    margin-bottom: 0;
  }

  /* Let the contained BlogPostCard stretch to full height */
  > * {
    height: 100%;
  }
`

const ExtendedBanner = styled(Banner)`
  margin-bottom: ${mediumSpacing};
`

const Home = ({
  metaTitle,
  metaDescription,
  heroTitle,
  stats,
  banner1Title,
  banner1ButtonText,
  banner1ButtonUrl,
  banner2Title,
  banner2ButtonText,
  banner2ButtonUrl,
  section1Title,
  portrait,
  videoTitle,
  videoUrl,
  bannersTitle,
  campaign,
  announcement,
  featuredBlogPostsTitle,
  featuredBlogPosts,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      headline={heroTitle}
      imageUrl="/static/images/hero/hero-talk.jpg"
      headlineMaxWidth="500px"
      headlinePlacement="bottom"
    />

    <PageSection>
      <StatList>
        {stats.map((stat, index) => (
          <Stat
            key={`${stat.icon.url} ${stat.number}`}
            {...stat}
            superscriptText={index + 1}
            sourceId={`home-stat-${index}`}
          />
        ))}
      </StatList>
    </PageSection>

    <Banner
      headline={banner1Title}
      buttonText={banner1ButtonText}
      buttonLink={banner1ButtonUrl}
    />

    <PageSection contained={false}>
      <Container>
        <h2>{videoTitle}</h2>
      </Container>

      <EmbeddedVideo videoUrl={videoUrl} />
    </PageSection>

    {campaign.isActive && (
      <PageSection>
        <h2>{bannersTitle}</h2>

        <ExtendedBanner
          subHeadline={campaign.bannerSmallTitle}
          headline={campaign.introHeading}
          description={campaign.introMarkdown}
          image={campaign.imageList[0].url}
          buttonLink={pages.campaign}
          buttonText={campaign.bannerButtonText}
        />

        {announcement && (
          <Banner
            subHeadline={announcement.subHeading}
            headline={announcement.heading}
            description={announcement.description}
            image={announcement.image.url}
            buttonLink={announcement.buttonLink}
            buttonText={announcement.buttonText}
            showImageOnRight
          />
        )}
      </PageSection>
    )}

    <PageSection>
      <Container>
        <h2>{featuredBlogPostsTitle}</h2>
      </Container>

      <BlogPostList className="row">
        {featuredBlogPosts.map((post) => (
          <BlogPostListItem key={post.slug} className="col-md-4">
            <BlogPostCard post={post} />
          </BlogPostListItem>
        ))}
      </BlogPostList>
    </PageSection>

    <PageSection contained={false}>
      <Container>
        <h2>{section1Title}</h2>
      </Container>

      <Carousel portrait={portrait} />
    </PageSection>

    <Banner
      headline={banner2Title}
      buttonText={banner2ButtonText}
      buttonLink={banner2ButtonUrl}
    />
  </div>
)

Home.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  heroTitle: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape(Stat.propTypes)).isRequired,
  banner1Title: PropTypes.string.isRequired,
  banner1ButtonText: PropTypes.string.isRequired,
  banner1ButtonUrl: PropTypes.string.isRequired,
  banner2Title: PropTypes.string.isRequired,
  banner2ButtonText: PropTypes.string.isRequired,
  banner2ButtonUrl: PropTypes.string.isRequired,
  section1Title: PropTypes.string.isRequired,
  portrait: PropTypes.shape(portraitPropTypes).isRequired,
  videoTitle: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  bannersTitle: PropTypes.string.isRequired,
  campaign: PropTypes.shape(campaignPageBannerPropTypes).isRequired,
  announcement: PropTypes.shape(announcementPropTypes),
  featuredBlogPostsTitle: PropTypes.string.isRequired,
  featuredBlogPosts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

Home.defaultProps = {
  metaDescription: undefined,
  announcement: undefined,
}

Home.getInitialProps = async function initialProps({ query }) {
  const locale = getLocaleFromQuery(query)
  return {
    ...(await fetchHomePage(locale)),
    featuredBlogPosts: await fetchNewestBlogPosts(locale, 3),
  }
}

export default withLayout(Home)
