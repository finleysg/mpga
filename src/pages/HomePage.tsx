import React from "react"

import { Col, Row } from "react-bootstrap"
import Container from "react-bootstrap/Container"

import { PageCodes, PolicyCodes } from "../app-constants"
import AnnouncementList from "../features/announcements/AnnouncementList"
import PageContentDetail from "../features/content/PageContentDetail"
import PolicyList from "../features/content/PolicyList"
import EventCalendar from "../features/events/calendar/EventCalendar"

const HomePage: React.FC = () => {
  return (
    <Container fluid={true}>
      <Row>
        <Col sm={12} md={5}>
          <PageContentDetail pageCode={PageCodes.Home} />
          <PolicyList policyCode={PolicyCodes.AboutUs} />
        </Col>
        <Col sm={12} md={4}>
          <AnnouncementList />
        </Col>
        <Col sm={12} md={3}>
          <EventCalendar />
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
