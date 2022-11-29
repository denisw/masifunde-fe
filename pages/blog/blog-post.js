import React from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TwitterShareButton, FacebookShareButton } from 'react-share'
import FaFacebook from 'react-icons/lib/fa/facebook'
import FaTwitter from 'react-icons/lib/fa/twitter'
import T from 'i18n-react'

import withLayout from '../../components/withLayout'
import Head from '../../components/Head'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchBlogPostPage } from '../../api/blog'
import PageSection from '../../components/PageSection'
import TeamMember from '../../components/TeamMember'
import teamMemberShape from '../../propTypes/teamMember'
import imageShape from '../../propTypes/image'
import Hero from '../../components/Hero'
import Markdown from '../../components/Markdown'
import {
  smBreakpoint,
  mdBreakpoint,
  lgBreakpoint,
} from '../../styling/breakpoints'
import { rem, footerText } from '../../styling/typography'
import Button from '../../components/Button'
import Link from '../../components/Link'
import * as pages from '../../routes/pages'
import { smallSpacing, largeSpacing } from '../../styling/sizes'
import SocialLink from '../../components/SocialLink'
import Divider from '../../components/Divider'
import formatDate from '../../utils/date'

// BlogPostError

const BlogPostError = () => (
  <div>
    <Head
      title={T.translate('blog.errorHeadTitle')}
      description={T.translate('blog.errorHeadMeta')}
    />
    <PageSection>
      <h1>{T.translate('blog.errorHeading')}</h1>
      <p className="offset-lg-2 col-lg-8">{T.translate('blog.errorText')}</p>
    </PageSection>
  </div>
)

// BlogPostContent

const BlogTitle = styled.h2`
  margin-left: 0;
  margin-right: 0;
  text-align: left;
  width: 100%;
  color: ${({ theme }) => theme.black};
`

const BlogMarkdown = styled(Markdown)`
  p:first-child {
    font-size: ${rem('24px')};
  }

  p img {
    width: 100%;
  }

  @media (min-width: ${smBreakpoint}) {
    p img {
      margin: 0 -25px;
      width: calc(100% + 50px);
    }
  }

  @media (min-width: ${mdBreakpoint}) {
    p img {
      margin: 0 -30px;
      width: calc(100% + 60px);
    }
  }

  @media (min-width: ${lgBreakpoint}) {
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
  margin-bottom: ${smallSpacing};

  p {
    ${footerText}
  }
`

const AuthorContainer = styled.div`
  margin-top: ${smallSpacing};
`

const H4 = styled.h4`
  text-align: left;
`

const ShareContainer = styled.div`
  > * {
    text-align: right;
  }

  margin-top: ${smallSpacing};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const shareButtonSpacing = '10px'
const ShareButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: -${shareButtonSpacing};

  > * {
    padding: ${shareButtonSpacing};
  }

  > :last-child {
    margin-right: -${shareButtonSpacing};
  }
`

const SocialShareLink = SocialLink.withComponent('div').extend`
  margin: 0;
`

const AuthorSection = ({ authorTeamMember, authorExternal, authorText }) => {
  const heading =
    authorTeamMember || authorExternal ? <H4>{authorText}</H4> : ''

  let author = null
  if (authorTeamMember || authorExternal) {
    author = authorTeamMember ? (
      <TeamMemberAuthor
        imageUrl={authorTeamMember.image.url}
        title={authorTeamMember.name}
        subtitle={authorTeamMember.responsibilityArea}
        email={authorTeamMember.email}
      />
    ) : (
      <p>{authorExternal}</p>
    )
  }

  return (
    <AuthorContainer className="col-6">
      {heading}
      {author}
    </AuthorContainer>
  )
}

AuthorSection.propTypes = {
  authorTeamMember: PropTypes.shape(teamMemberShape),
  authorExternal: PropTypes.string,
  authorText: PropTypes.string,
}

AuthorSection.defaultProps = {
  authorTeamMember: null,
  authorExternal: '',
  authorText: '',
}

const BlogPostContent = ({
  title,
  metaDescription,
  date,
  heroImage,
  content,
  authorTeamMember,
  authorExternal,
  authorText,
  shareText,
}) => {
  const router = useRouter()
  const pageUrl = `https://www.masifunde.de/${router.asPath}`

  const shareMessage = ''
  const shareIconSize = 24

  return (
    <div>
      <Head title={title} description={metaDescription} />

      {heroImage && (
        <Hero
          heroSize="small"
          backgroundPositionX="70%"
          imageUrl={heroImage.url}
        />
      )}

      <PageSection>
        <div className="row">
          <div className="offset-lg-2 col-lg-8">
            <DateContainer>
              <p>{formatDate(date)}</p>
            </DateContainer>
            <BlogTitle>{title}</BlogTitle>
            <BlogMarkdown source={content} />
            <div className="row">
              <AuthorSection
                authorTeamMember={authorTeamMember}
                authorExternal={authorExternal}
                authorText={authorText}
              />
              <ShareContainer className="col-6">
                <H4>{shareText}</H4>
                <ShareButtonRow>
                  <FacebookShareButton url={pageUrl} quote={shareMessage}>
                    <SocialShareLink>
                      <FaFacebook size={shareIconSize} />
                    </SocialShareLink>
                  </FacebookShareButton>

                  <TwitterShareButton url={pageUrl} title={shareMessage}>
                    <SocialShareLink>
                      <FaTwitter size={shareIconSize} />
                    </SocialShareLink>
                  </TwitterShareButton>
                </ShareButtonRow>
              </ShareContainer>
            </div>
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

// BlogPostNav

const DividerWithMargin = styled(Divider)`
  margin: ${largeSpacing} 0;
`

const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .longNavText {
    display: none;
  }
  .shortNavText {
    display: inline;
  }

  @media (min-width: ${smBreakpoint}) {
    .longNavText {
      display: inline;
    }
    .shortNavText {
      display: none;
    }
  }
`

const NavButton = styled(Button)`
  visibility: ${(props) => (props.href ? 'visible' : 'hidden')};
`

const BlogPostNav = ({
  previousPost,
  previousPostText,
  blogHomeText,
  nextPost,
  nextPostText,
}) => (
  <div className="container">
    <div className="row">
      <div className="offset-lg-2 col-lg-8">
        <DividerWithMargin />
        <NavContainer>
          {previousPost && (
            <Link
              href={{
                pathname: pages.blogPost,
                query: { slug: previousPost },
              }}
              passHref
            >
              <NavButton type="secondary">
                <span className="longNavText">{previousPostText}</span>
                <span className="shortNavText">{'<'}</span>
              </NavButton>
            </Link>
          )}
          <Link
            href={{
              pathname: pages.blog,
              query: { page: '1' },
            }}
            passHref
          >
            <NavButton type="secondary">{blogHomeText}</NavButton>
          </Link>
          {nextPost && (
            <Link
              href={{
                pathname: pages.blogPost,
                query: { slug: nextPost },
              }}
              passHref
            >
              <NavButton type="secondary">
                <span className="longNavText">{nextPostText}</span>
                <span className="shortNavText">{'>'}</span>
              </NavButton>
            </Link>
          )}
        </NavContainer>
      </div>
    </div>
  </div>
)

BlogPostNav.propTypes = {
  previousPost: PropTypes.string,
  previousPostText: PropTypes.string,
  nextPost: PropTypes.string,
  blogHomeText: PropTypes.string,
  nextPostText: PropTypes.string,
}

BlogPostNav.defaultProps = {
  previousPost: null,
  previousPostText: '',
  blogHomeText: '',
  nextPost: null,
  nextPostText: '',
}

// BlogPost

const BlogPost = (props) => {
  const { error } = props
  return error ? (
    <BlogPostError />
  ) : (
    <div>
      <BlogPostContent {...props} />
      <BlogPostNav {...props} />
    </div>
  )
}

BlogPost.propTypes = {
  ...BlogPostContent.propTypes,
  ...BlogPostNav.propTypes,
}

BlogPost.defaultProps = {
  ...BlogPostContent.defaultProps,
  ...BlogPostNav.defaultProps,
}

BlogPost.getInitialProps = async function initialProps({ query }) {
  return fetchBlogPostPage(getLocaleFromQuery(query), query.slug)
}

export default withLayout(BlogPost)
