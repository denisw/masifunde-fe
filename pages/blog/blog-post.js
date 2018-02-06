/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  TwitterShareButton,
  FacebookShareButton,
} from 'react-share'
import FaFacebook from 'react-icons/lib/fa/facebook'
import FaTwitter from 'react-icons/lib/fa/twitter'

import withLayout from '../../components/withLayout'
import Head from '../../components/Head'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchBlogPost, fetchBlogPostPage } from '../../api/blog'
import PageSection from '../../components/PageSection'
import TeamMember from '../../components/TeamMember'
import teamMemberShape from '../../propTypes/teamMember'
import imageShape from '../../propTypes/image'
import Hero from '../../components/Hero'
import Markdown from '../../components/Markdown'
import { smBreakpoint, mdBreakpoint, lgBreakpoint } from '../../styling/breakpoints'
import theme from '../../styling/theme'
import { rem, footerText } from '../../styling/typography'
import Button from '../../components/Button'
import Link from '../../components/Link'
import { RouteNames as routes } from '../../routes'

const BlogPostError = props => (
  <div>
    <Head title="FIXME: Oops" description="FIXME: Something went wrong" />
    <PageSection>
      <h1>FIXME: Oops</h1>
      <p className="offset-lg-2 col-lg-8">{props.error}</p>
    </PageSection>
  </div>
)

BlogPostError.propTypes = {
  error: PropTypes.string,
}

BlogPostError.defaultProps = {
  error: null,
}

const BlogTitle = styled.h2`
  margin-left: 0;
  margin-right: 0;
  text-align: left;
  width: 100%;
  color: ${theme.black};
`

const BlogMarkdown = styled(Markdown)`
  p:first-child {
    font-size: ${rem('24px')}
  }

  p img {
    width: 100%;
  }

  @media(min-width:${smBreakpoint}) {
    p img {
      margin: 0 -25px;
      width: calc(100% + 50px);
    }
  }

  @media(min-width:${mdBreakpoint}) {
    p img {
      margin: 0 -30px;
      width: calc(100% + 60px);
    }
  }

  @media(min-width:${lgBreakpoint}) {
    p img {
      margin: 0 -120px;
      width: calc(100% + 240px);
    }
  }
`

const TeamMemberAuthor = styled(TeamMember)`
  justify-content: flex-start;
`

const DateContainer = styled.div`
  margin-bottom: 1.5rem;

  p {
    ${footerText}
  }
`

const AuthorContainer = styled.div`
  margin-top: 1.5rem;
`

const H4 = styled.h4`
  text-align: left;
`

const ShareContainer = styled.div`
  > * {
    text-align: right;
  }

  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const ShareButtonRow = styled.div`
  display: flex;
  flex-direction: row;

  > * {
    padding: 10px;
  }

  > :last-child {
    margin-right: -10px;
  }
`

const SocialLink = styled.div`
  color: #444444;
  opacity: 0.6;
  cursor: pointer;

  &:hover {
    color: #444444 !important;
    opacity: 1;
  }
`

const HorizontalRule = styled.hr`
  border-width: 2px;
  border-color: ${props => props.theme.pineCone};
  margin-top: 4rem;
`

const ButtonContainer = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
`

const BlogPostContent = (props) => {
  const {
    title,
    metaDescription,
    date,
    heroImage,
    content,
    authorTeamMember,
    authorExternal,
    url,
  } = props

  const author = authorTeamMember ?
    (<TeamMemberAuthor
      imageUrl={authorTeamMember.image.url}
      title={authorTeamMember.name}
      subtitle={authorTeamMember.responsibilityArea}
      email={authorTeamMember.email}
    />) :
    <p>{authorExternal}</p>

  const pageUrl = `https://www.masifunde.de/${url.asPath}`
  const shareMessage = ''

  return (
    <div>
      <Head title={title} description={metaDescription} />

      {heroImage && <Hero
        heroSize="small"
        backgroundPositionX="70%"
        imageUrl={heroImage.url}
      />}

      <PageSection>
        <div className="offset-lg-2 col-lg-8">
          <DateContainer>
            <p>{date}</p>
          </DateContainer>
          <BlogTitle>{title}</BlogTitle>
          <BlogMarkdown source={content} />
          <div className="row">
            <AuthorContainer className="col-6">
              <H4>{props.authorText}</H4>
              {author}
            </AuthorContainer>
            <ShareContainer className="col-6">
              <H4>{props.shareText}</H4>

              <ShareButtonRow>
                <FacebookShareButton
                  url={pageUrl}
                  quote={shareMessage}
                >
                  <SocialLink>
                    <FaFacebook size={24} />
                  </SocialLink>
                </FacebookShareButton>

                <TwitterShareButton
                  url={pageUrl}
                  title={shareMessage}
                >
                  <SocialLink>
                    <FaTwitter size={24} />
                  </SocialLink>
                </TwitterShareButton>
              </ShareButtonRow>

            </ShareContainer>
          </div>

        </div>
      </PageSection>

    </div>
  )
}

BlogPostContent.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  metaDescription: PropTypes.string,
  date: PropTypes.string,
  heroImage: PropTypes.shape(imageShape),
  content: PropTypes.string,
  authorTeamMember: PropTypes.shape(teamMemberShape),
  authorExternal: PropTypes.string,
}

BlogPostContent.defaultProps = {
  title: '',
  slug: '',
  metaDescription: '',
  date: '',
  heroImage: null,
  content: '',
  authorTeamMember: null,
  authorExternal: '',
}

const BlogPost = props => (
  props.error ?
    BlogPostError(props) :
    (
      <div>
        {BlogPostContent(props)}

        <PageSection>
          <div className="offset-lg-2 col-lg-8">
            <HorizontalRule />

            <ButtonContainer>
              <Link route={props.previousPostRoute} passHref>
                <Button type="secondary">{props.previousPostText}</Button>
              </Link>
              <Link route={routes.Blog} passHref>
                <Button type="secondary">{props.blogHomeText}</Button>
              </Link>
              <Link route={props.nextPostRoute} passHref>
                <Button type="secondary">{props.nextPostText}</Button>
              </Link>
            </ButtonContainer>
          </div>
        </PageSection>
      </div>
    )
)

BlogPost.propTypes = {
  ...BlogPostContent.propTypes,
  ...BlogPostError.propTypes,
  previousPostRoute: PropTypes.string,
  nextPostRoute: PropTypes.string,
}

BlogPost.defaultProps = {
  ...BlogPostContent.defaultProps,
  ...BlogPostError.defaultProps,
}

BlogPost.getInitialProps = async function initialProps({ query }) {
  return Promise.all([
    fetchBlogPostPage(getLocaleFromQuery(query)),
    fetchBlogPost(getLocaleFromQuery(query), query.slug)
      .catch((error) => {
        if (error.id === 'POST_NOT_FOUND') {
          return { error: error.toString() }
        }
        throw error
      }),
  ])
    .then((results) => {
      const page = results[0]
      const post = results[1]
      return { ...page, ...post }
    })
}

export default withLayout(BlogPost)

