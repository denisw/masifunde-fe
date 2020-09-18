import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import imagePropShape from '../../propTypes/image'
import DocumentDownloadBox from '../DocumentsList/DocumentDownloadBox'
import FilePropType from '../../propTypes/file'
import { smBreakpoint } from '../../styling/breakpoints'
import { extraExtraSmallSpacing } from '../../styling/sizes'
import PodcastCard from './PodcastCard'

const BoxContainerCol = styled.div`
  flex: 1 0 28%;
  margin: 5px;
  margin-bottom: 30px;

  @media (min-width: ${smBreakpoint}) {
    display: block;
  }
`

const Box = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`

const Podcast = ({ expandList, podcast }) => (
  <Fragment>
  <Box>
    {expandList ? (
      <div className="row">
        {podcast.map(({
          podcastTitle, podcastImage, podcastAudio, date, duration
        }) => (
          <BoxContainerCol className="col-md-6" key={podcastAudio.url}>
            <div className="row">
            <PodcastCard podcastTitle={podcastTitle} podcastImage={podcastImage}
             podcastAudio={podcastAudio} date={date} duration={duration}/>
            </div>
          </BoxContainerCol>
        ))}
      </div>
    ) : (
      <div className="row">
        {podcast.map(({ podcastTitle, podcastAudio, podcastImage, date, duration }) => (
          <BoxContainerCol key={podcastAudio.url} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-auto">
            <PodcastCard podcastTitle={podcastTitle} podcastImage={podcastImage}
             podcastAudio={podcastAudio} date={date} duration={duration}/>
          </BoxContainerCol>
        ))}
      </div>
    )}
    </Box>
  </Fragment>
)

Podcast.propTypes = {
  expandList: PropTypes.bool,
  podcast: PropTypes.arrayOf(PropTypes.shape({
    podcastImage: PropTypes.shape(imagePropShape),
    podcastTitle: PropTypes.string,
    podcastAudio: PropTypes.shape(FilePropType),
    date: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired
  })),
}

Podcast.defaultProps = {
  expandList: false,
  podcast: [],
}

export default Podcast
