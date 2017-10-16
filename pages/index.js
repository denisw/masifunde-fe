/* eslint-disable react/prop-types */
import React from 'react'
import Link from 'next/link'
import { Button, Container, Row, Col } from 'reactstrap'
import * as texts from '../text/home-strings'
import Layout from '../components/Layout'
import { getAuthorTeamMembers } from '../api/contentGetter'

const Index = props => (
  <Layout>
    <Container>
      <Row>Some text</Row>
      <Row>
        <Col>
          <Row>{texts.mainTitle}</Row>
          <Row>{texts.mainText}</Row>
        </Col>
        <Col />
      </Row>

      <h1>{props.title}</h1>
      <p>{props.text}</p>
      <Button color="danger">I am a Reactstrap button</Button>

      <br />
      <Link href="/donate">DONATE</Link>
      <br />

      <p>Content types:</p>
      <p />
    </Container>
  </Layout>
)

// Index.getInitialProps = async function() {
//   const types = await api.getContentTypes();
//   const type = types[0];

//   const entries = await api.getEntriesForContentType(type);
//   const newsItem = entries[0];

//   return {
//     title: newsItem.fields.title,
//     text: newsItem.fields.text
//   };
// }

Index.getInitialProps = async function getInitialProps() {
  const resultJSON = await getAuthorTeamMembers()

  console.log('Result:', resultJSON)

  return resultJSON
}

export default Index
