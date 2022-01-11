import React from "react";

import moment from "moment";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { EventProps } from "../eventsPropType";

const EventRegisrationDatesView: React.FC<EventProps> = (props) => {
  const { eventDetail } = props;
  return (
    <div>
      <React.Fragment>
        {eventDetail.registrationIsClosed && <p className="text-warning">Registration is closed</p>}
        {!eventDetail.registrationIsClosed && (
          <div>
            <Row>
              <Col>Registration Opens:</Col>
              <Col>{moment(eventDetail.registrationStart).format("MMM Do YYYY")}</Col>
            </Row>
            <Row>
              <Col>Mail-in Registration Ends:</Col>
              <Col>{moment(eventDetail.earlyRegistrationEnd).format("MMM Do YYYY")}</Col>
            </Row>
            <Row>
              <Col>Online Registration Ends:</Col>
              <Col>{moment(eventDetail.registrationEnd).format("MMM Do YYYY")}</Col>
            </Row>
          </div>
        )}
      </React.Fragment>
    </div>
  );
};

export default EventRegisrationDatesView;
