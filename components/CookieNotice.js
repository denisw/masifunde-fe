import T from 'i18n-react'
import React, { Component } from 'react'
import styled from 'styled-components'

import * as pages from '../routes/pages'
import { smBreakpoint } from '../styling/breakpoints'
import { extraSmallSpacing, extraExtraSmallSpacing } from '../styling/sizes'
import { haveCookiesBeenAccepted, markCookiesAccepted } from '../utils/cookies'
import Button from './Button'
import Link from './Link'

const Banner = styled.div.attrs({ role: 'dialog' })`
  background-color: ${({ theme }) => theme.orange};

  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${extraSmallSpacing};

  @media (min-width: ${smBreakpoint}) {
    flex-direction: row;
  }
`

const Text = styled.p`
  color: white;
  margin: 0;
  text-align: center;
  /* for IE 11 */
  max-width: 100%;
`

const Buttons = styled.div`
  margin-top: ${extraSmallSpacing};
  display: flex;

  /* for IE 11 */
  flex-shrink: 0;

  @media (min-width: ${smBreakpoint}) {
    flex-direction: row;
    margin-top: 0;
    margin-left: ${extraSmallSpacing};
  }
`

const PrivacyPolicyButton = styled(Button).attrs({ type: 'banner' })`
  white-space: nowrap;
`

const AcceptButton = styled(Button).attrs({ type: 'banner' })`
  margin-left: ${extraExtraSmallSpacing};
  white-space: nowrap;
`

export default class CookieNotice extends Component {
  state = { visible: false }

  componentDidMount() {
    // We cannot check for cookie acceptance on the server because that
    // doesn't have access to the browser's localStorage. We thus need
    // to do the check in componentDidMount (componentWillMount also
    // runs on the server).
    //
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ visible: !haveCookiesBeenAccepted() })
  }

  handleAccept = () => {
    markCookiesAccepted()
    this.setState({ visible: false })
  }

  render() {
    if (!this.state.visible) {
      return null
    }

    return (
      <Banner>
        <Text>{T.translate('cookieNotice.text')}</Text>

        <Buttons>
          <Link href={pages.datenschutz} passHref>
            <PrivacyPolicyButton type="banner">
              {T.translate('cookieNotice.privacyPolicy')}
            </PrivacyPolicyButton>
          </Link>
          <AcceptButton onClick={this.handleAccept}>
            {T.translate('cookieNotice.accept')}
          </AcceptButton>
        </Buttons>
      </Banner>
    )
  }
}
