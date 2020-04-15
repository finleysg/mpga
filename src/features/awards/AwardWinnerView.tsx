import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { TiDocumentText } from "react-icons/ti";

import { AwardWinner } from "../../models/Events";
import styled from "styled-components";

export const Notes = styled.span`
    font-size: .9em;
    font-style: italic;
`;

export interface IAwardWinnerViewProps {
    winner: AwardWinner;
}

const AwardWinnerView: React.FC<IAwardWinnerViewProps> = (props) => {
    const { winner } = props;
    const [showNote, updateShowNote] = useState(false);

    return (
        <React.Fragment>
            <Row>
                <Col xs="3">{winner.year}</Col>
                <Col xs="8">{winner.winner}</Col>
                <Col xs="1" className="clickable text-secondary" onClick={() => updateShowNote(!showNote)}>
                    {winner.notes && <TiDocumentText size={18} color={"primary"} />}
                </Col>
            </Row>
            {winner.notes && showNote && (
                <Row>
                    <Col><Notes>{winner.notes}</Notes></Col>
                </Row>
            )}
        </React.Fragment>
    );
};

export default AwardWinnerView;
