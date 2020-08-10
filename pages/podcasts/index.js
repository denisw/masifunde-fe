import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Container } from 'reactstrap'

import withLayout from '../../components/withLayout'
import Head from '../../components/Head'
import PageSection from '../../components/PageSection'
import { getLocaleFromQuery } from '../../utils/locale'

import { fetchPodcastPage } from '../../api/podcast'
import { pageTitleWidth, rem } from '../../styling/typography'
import { lgBreakpoint } from '../../styling/breakpoints'
import { smBreakpoint } from '../../styling/breakpoints'
import Divider from '../../components/Divider'
import BlogListItem from '../../components/Blog/BlogListItem'
import BlogListNavigationButtons from '../../components/Blog/BlogListNavigationButtons'
import DocumentsList from '../../components/DocumentsList'
import PodcastList from '../../components/Podcast'
import teamMemberProps from '../../propTypes/teamMember'
import TextWithTeamMember from '../../components/TextWithTeamMember'
import CenteredText from '../../components/CenteredText'
import Banner from '../../components/Banner'
import { largeSpacing } from '../../styling/sizes'


const PodcastPostsList = styled.ol`
  list-style-type: none;
  padding: 0;
  margin-left: auto;
  margin-right: auto;

  > * {wq3w
    margin-bottom: ${rem('70px')};
  }

  @media (min-width: ${lgBreakpoint}) {
    width: ${pageTitleWidth};
  }
`

const PodcastSubHeading = styled.h2`
  text-align: center;
  color: #271b19;
  font-weight: normal;
  font-size: 1.1rem;
`

const PodcastPostsListHeading = styled.h1`
  text-align: left;
`

const PodcastListFooter = styled.div`
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${lgBreakpoint}) {
    width: 60%;
  }
`

const TeamMemberContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: ${smBreakpoint}) {
    display: block;
  }
`

const ExtendedDivider = Divider.extend`
  margin-top: ${largeSpacing} !important;
`


class Podcast extends Component {
  componentWillReceiveProps(newProps, props) {
    if (newProps.page !== props.page) {
      this.resetFocus()
    }
  }

  resetFocus = () => document.activeElement.blur()

  render() {
    const {
      metaTitle,
      metaDescription,
      introHeading,
      introSubHeading,
      introMarkdown,
      //blogListTitle,
      podcast,
      //previousPageButtonText,
      //nextPageButtonText,
      //page,
      //isLastPage,
      //totalNumberOfPages,
      contactTextHeading,
      contactText,
      teamMember,
      bannerTitle,
      bannerButtonText,
      bannerButtonUrl,
    } = this.props
    return (
      <div>
        <Head title={metaTitle} description={metaDescription} />
        <PageSection>
          <h1>{introHeading}</h1>
          {console.log(podcast)}
          <PodcastSubHeading>{introSubHeading}</PodcastSubHeading>
          <CenteredText source={introMarkdown} />
        </PageSection>

        <PageSection>
          <PodcastList podcast={podcast}/>
        </PageSection>
        <ExtendedDivider color="orange" />
        <PageSection>
          <TeamMemberContainer>
            <TextWithTeamMember
              header={contactTextHeading}
              text={contactText}
              teamMemberTitle={teamMember.name}
              teamMemberSubtitle={teamMember.responsibilityArea}
              teamMember={teamMember}
            />
          </TeamMemberContainer>
        </PageSection>

        <Banner
          headline={bannerTitle}
          buttonText={bannerButtonText}
          buttonLink={bannerButtonUrl}
        />

      </div>
    )
  }
}






Podcast.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
  podcast: PodcastList.propTypes.podcast.isRequired,
  introHeading: PropTypes.string.isRequired,
  introSubHeading:PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  //...BlogListNavigationButtons.propTypes,
  //page: PropTypes.number.isRequired,
  //isLastPage: PropTypes.bool.isRequired,
  //totalNumberOfPages: PropTypes.number.isRequired,
  contactTextHeading: PropTypes.string.isRequired,
  contactText: PropTypes.string.isRequired,
  teamMember:PropTypes.shape(teamMemberProps).isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
}

Podcast.defaultProps = {
  podcast: [],
}

Podcast.getInitialProps = function initialProps({ query }) {
  const { page } = query
  return fetchPodcastPage(getLocaleFromQuery(query), page)
}

export default withLayout(Podcast)
