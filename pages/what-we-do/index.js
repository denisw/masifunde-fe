/* eslint-disable function-paren-newline */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import withLayout from '../../components/withLayout'
import { fetchWhatWeDoPage } from '../../api/whatWeDo'
import { getLocaleFromQuery } from '../../utils/locale'
import Head from '../../components/Head'
import EmbeddedVideo from '../../components/EmbeddedVideo'
import Button from '../../components/Button'
import Stat from '../../components/Stat'
import * as pages from '../../routes/pages'
import Link from '../../components/Link'
import Hero from '../../components/Hero'
import Banner from '../../components/Banner'
import { mdBreakpoint } from '../../styling/breakpoints'
import CenteredText from '../../components/CenteredText'
import Markdown from '../../components/Markdown'
import PageSection from '../../components/PageSection'
import Tagline from '../../components/Tagline'
import StatList from '../../components/StatList'
import imageShape from '../../propTypes/image'
import { bodyTextLineHeight } from '../../styling/typography'
import { mediumSpacing, smallSpacing } from '../../styling/sizes'
import IconImage from '../../components/IconImage'

const ImagePropType = PropTypes.shape(imageShape)

const ProjectPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  image: ImagePropType.isRequired,
})

const CountryPropType = PropTypes.shape({
  buttonLink: PropTypes.any.isRequired,
  button: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(ProjectPropType).isRequired,
  title: PropTypes.string.isRequired,
})

const ProjectListContainer = styled.div`
  margin-top: ${smallSpacing};
  margin-bottom: 1.2rem;
  width: 100%;

  display: flex;
  justify-content: center;
`

const Project = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProjectText = styled.p`
  text-align: center;

  /*
   * Let text wrap correctly in Internet Explorer:
   * https://stackoverflow.com/questions/35111090/text-in-a-flex-container-doesnt-wrap-in-ie11
   */
  width: 100%;

  /*
   * The South Africa and Germany projects are in two different containers,
   * so when they are shown next to each other (i.e., at medium viewport size
   * and up), they may not exactly line up vertically because the row heights
   * might vary with the number of lines needed for the project names.
   *
   * To mitigate this issue, we demand all ProjectText elements to be at least
   * two lines high, irrespective of content. This ensures that the alignment
   * problem only happens if project names grow beyond two lines, which is
   * hopefully unlikely -- though not impossible, of course...
   */
  min-height: calc(2em * ${bodyTextLineHeight});
`

const ProjectList = ({ projects }) => (
  <ProjectListContainer className="row">
    {projects.map((project) => (
      <Project
        className="col-sm-6"
        key={`${project.image.url} ${project.name}`}
      >
        <IconImage src={project.image.url} alt="" />
        <ProjectText>{project.name}</ProjectText>
      </Project>
    ))}
  </ProjectListContainer>
)

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(ProjectPropType).isRequired,
}

const ProjectsGridContainer = styled.div`
  @media (min-width: ${mdBreakpoint}) {
    display: grid;
    display: -ms-grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    -ms-grid-columns: 1fr 1fr;
    -ms-grid-rows: auto auto auto;
  }
`

const projectsGridColumnGap = 2 // rem

const ProjectsGridCell = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: ${mdBreakpoint}) {
    grid-row: ${(props) => props.row};
    grid-column: ${(props) => props.column};
    -ms-grid-row: ${(props) => props.row};
    -ms-grid-column: ${(props) => props.column};

    margin-right: ${projectsGridColumnGap / 2}rem;

    ${(props) =>
      props.column > 1 &&
      css`
        margin-left: ${projectsGridColumnGap / 2}rem;
      `}
  }
`

const ProjectsGridTitleCell = ProjectsGridCell.extend`
  margin-top: ${mediumSpacing};

  &:first-of-type {
    margin-top: 0;
  }

  @media (min-width: ${mdBreakpoint}) {
    margin-top: 0;
  }
`

const CountryTitle = styled.h3`
  text-align: center;
`

const CountryDescription = styled.div`
  flex-grow: 1;
  width: 87.5%;

  @media (min-width: ${mdBreakpoint}) {
    justify-content: center;
  }
`

const ProjectsGridColumn = ({ column, country }) => (
  <Fragment>
    <ProjectsGridTitleCell column={column} row={1}>
      <CountryTitle>{country.title}</CountryTitle>
    </ProjectsGridTitleCell>
    <ProjectsGridCell column={column} row={2}>
      <CountryDescription>{country.description}</CountryDescription>
    </ProjectsGridCell>
    <ProjectsGridCell column={column} row={3}>
      <ProjectList projects={country.projects} />
    </ProjectsGridCell>
    <ProjectsGridCell column={column} row={4}>
      <Link href={country.buttonLink} passHref>
        <Button type="secondary">{country.button}</Button>
      </Link>
    </ProjectsGridCell>
  </Fragment>
)

ProjectsGridColumn.propTypes = {
  column: PropTypes.number.isRequired,
  country: CountryPropType.isRequired,
}

const ProjectsGrid = ({ leftCountry, rightCountry }) => (
  <ProjectsGridContainer>
    <ProjectsGridColumn column={1} country={leftCountry} />
    <ProjectsGridColumn column={2} country={rightCountry} />
  </ProjectsGridContainer>
)

ProjectsGrid.propTypes = {
  leftCountry: CountryPropType.isRequired,
  rightCountry: CountryPropType.isRequired,
}

const ImpactButton = styled(Button)`
  margin-top: ${smallSpacing};
`

const WhatWeDo = ({
  centerHeading,
  introHeading0,
  introText,
  introHeading,
  metaDescription,
  metaTitle,
  outroHeading,
  outroText,
  outroTextColumn2,
  countries,
  stats,
  statsButton,
  statsHeading,
  heroTitle,
  videoUrl,
  bannerButtonText,
  bannerTitle,
  bannerButtonUrl,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      imageUrl="/static/images/hero/hero-student.jpg"
      headline={heroTitle}
      headlineShadow
      headlinePlacement="bottom"
    />

    <PageSection>
      <h1>{introHeading0}</h1>
      <CenteredText source={introText} />
    </PageSection>

    <PageSection contained={false}>
      <EmbeddedVideo videoUrl={videoUrl} />
    </PageSection>

    <PageSection>
      <h1>{introHeading}</h1>
      <ProjectsGrid
        leftCountry={countries.southAfrica}
        rightCountry={countries.germany}
      />
    </PageSection>

    <Tagline text={centerHeading} />

    <PageSection>
      <h1>{statsHeading}</h1>
      <StatList>
        {stats.map((stat, index) => (
          <Stat
            key={`${stat.number} ${stat.description}`}
            {...stat}
            superscriptText={index + 1}
            sourceId={`stat-${index}`}
          />
        ))}
      </StatList>
      <Link href={pages.impact} passHref>
        <ImpactButton center type="secondary">
          {statsButton}
        </ImpactButton>
      </Link>
    </PageSection>

    <PageSection>
      <h1>{outroHeading}</h1>
      <div className="row">
        <Markdown className="col-md-6" source={outroText} />
        <Markdown className="col-md-6" source={outroTextColumn2} />
      </div>
    </PageSection>

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={bannerButtonUrl}
    />
  </div>
)

WhatWeDo.propTypes = {
  centerHeading: PropTypes.string.isRequired,
  heroTitle: PropTypes.string.isRequired,
  introHeading0: PropTypes.string.isRequired,
  introText: PropTypes.string.isRequired,
  introHeading: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  metaTitle: PropTypes.string.isRequired,
  outroHeading: PropTypes.string.isRequired,
  outroText: PropTypes.string.isRequired,
  outroTextColumn2: PropTypes.string.isRequired,
  countries: PropTypes.shape({
    southAfrica: CountryPropType.isRequired,
    germany: CountryPropType.isRequired,
  }).isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  statsButton: PropTypes.string.isRequired,
  statsHeading: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
}

WhatWeDo.defaultProps = {
  metaDescription: undefined,
}

WhatWeDo.getInitialProps = async function initialProps({ query }) {
  return fetchWhatWeDoPage(getLocaleFromQuery(query))
}

export default withLayout(WhatWeDo)
