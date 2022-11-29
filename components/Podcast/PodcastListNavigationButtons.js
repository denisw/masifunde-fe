import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '../Button'
import Link from '../../components/Link'
import * as pages from '../../routes/pages'
import { smBreakpoint } from '../../styling/breakpoints'
import { largeSpacing } from '../../styling/sizes'

const ButtonsContainer = styled.nav`
  margin-top: ${largeSpacing};

  & {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;

    @media (min-width: ${smBreakpoint}) {
      align-items: flex-start;
    }
  }

  > div {
    &:first-of-type,
    &:nth-of-type(3) {
      flex-grow: 1;

      a {
        width: 100%;
      }
    }

    &:nth-of-type(2) {
      flex-grow: 3;
    }
  }
`

const PodcastListNavigationLink = ({
  buttonText,
  currentPage,
  page,
  rounded,
}) => (
  <Link
    href={{
      pathname: pages.podcast,
      query: { page },
    }}
    passHref
  >
    <Button isActive={currentPage && currentPage === page} rounded={rounded}>
      {buttonText || page}
    </Button>
  </Link>
)

PodcastListNavigationLink.propTypes = {
  page: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  buttonText: PropTypes.string,
  rounded: PropTypes.bool,
}

PodcastListNavigationLink.defaultProps = {
  buttonText: undefined,
  currentPage: undefined,
  rounded: false,
}

const PageButtonsContainer = styled.div`
  display: flex;
  justify-content: center;

  > * {
    display: none;
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    @media (min-width: ${smBreakpoint}) {
      display: block;
    }
  }
`

const PodcastListNavigationButtons = ({
  previousPageButtonText,
  nextPageButtonText,
  page,
  isLastPage,
  totalNumberOfPages,
}) => {
  const isFirstPage = page === 1
  const isNotFirstPage = !isFirstPage
  const isNotLastPage = !isLastPage
  const moreThanOnePage = totalNumberOfPages !== 1
  const threeOrMorePages = totalNumberOfPages >= 3

  let firstPageButton = page - 1
  let secondPageButton = page
  let thirdPageButton = page + 1

  if (isFirstPage) {
    firstPageButton += 1
    secondPageButton += 1
    thirdPageButton += 1
  }

  if (isLastPage) {
    firstPageButton -= 1
    secondPageButton -= 1
    thirdPageButton -= 1
  }

  return (
    <ButtonsContainer>
      <div>
        {isNotFirstPage && (
          <PodcastListNavigationLink
            rel="prev"
            page={page - 1}
            buttonText={previousPageButtonText}
          />
        )}
      </div>
      <PageButtonsContainer>
        {moreThanOnePage && (
          <PodcastListNavigationLink
            currentPage={page}
            page={firstPageButton}
            rounded
          />
        )}
        <PodcastListNavigationLink
          currentPage={page}
          page={secondPageButton}
          rounded
        />
        {threeOrMorePages && (
          <PodcastListNavigationLink
            currentPage={page}
            page={thirdPageButton}
            rounded
          />
        )}
      </PageButtonsContainer>
      <div>
        {isNotLastPage && (
          <PodcastListNavigationLink
            rel="next"
            page={page + 1}
            buttonText={nextPageButtonText}
          />
        )}
      </div>
    </ButtonsContainer>
  )
}

PodcastListNavigationButtons.propTypes = {
  previousPageButtonText: PropTypes.string.isRequired,
  nextPageButtonText: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  totalNumberOfPages: PropTypes.number.isRequired,
  isLastPage: PropTypes.bool.isRequired,
}

export default PodcastListNavigationButtons
