import React from 'react'
import Head from 'next/head'
import {Col, Row} from 'antd'
import Header from '../components/Header'



const Details = () => (
  <div className="container">
    <Head>
      <title>Details</title>
    </Head>
    <Header />
    <Row className="common-main" type="flex" justify="cneter">
      <Col className="common-left" xs={24} sm={24} md={16} lg={14} xl={14}>
        左侧
      </Col>
      <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
        右侧
      </Col>
    </Row>


  </div>
)

export default Details
