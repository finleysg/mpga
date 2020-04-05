import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { ClubContact } from "../../models/Clubs";

export interface ITeamCaptainProps {
    captains: ClubContact[];
}

const TeamCaptains: React.FC<ITeamCaptainProps> = props => {
    const { captains } = props;

    return (
        <Row>
            {captains.map(c => {
                return (
                    <Col key={c.id}>
                        <p>
                            <strong>
                                {c.contact?.firstName} {c.contact?.lastName}
                            </strong>
                        </p>
                        <p>{c.contact?.email}</p>
                        <p>
                            {c.contact?.primaryPhone}
                            {c.contact?.alternatePhone && <span> / {c.contact?.alternatePhone}</span>}
                        </p>
                        {c.notes && <p>{c.notes}</p>}
                    </Col>
                );
            })}
        </Row>
    );
};

export default TeamCaptains;
