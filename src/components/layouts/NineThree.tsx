import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ITwoColumns } from './TwoEvenColumns';

const NineThree: React.FC<ITwoColumns> = (props) => {
    return (
        <Row>
            <Col sm={6} lg={9}>{props.LeftColumn}</Col>
            <Col sm={6} lg={3}>{props.RightColumn}</Col>
        </Row>
    );
}

export default NineThree;
