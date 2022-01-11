import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Notes from "../../components/Notes";
import { TeamCaptainProps } from "./matchPlayPropTypes";

const TeamCaptains: React.FC<TeamCaptainProps> = (props) => {
  const { captains } = props;

  return (
    <Row>
      {captains.map((c) => {
        return (
          <Col key={c.id} className="pl-1">
            <p className="mb-0">
              <strong>
                {c.contact?.firstName} {c.contact?.lastName}
              </strong>
            </p>
            <p className="mb-0">{c.contact?.email}</p>
            <p className="mb-0">
              {c.contact?.primaryPhone}
              {c.contact?.alternatePhone && <span> / {c.contact?.alternatePhone}</span>}
            </p>
            {c.notes && (
              <p className="mb-0">
                <Notes>{c.notes}</Notes>
              </p>
            )}
          </Col>
        );
      })}
    </Row>
  );
};

export default TeamCaptains;
