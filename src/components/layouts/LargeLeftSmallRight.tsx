import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ITwoColumns } from './TwoEvenColumns';

const LargeLeftSmallRight: React.FC<ITwoColumns> = (props) => {
    return (
        <Row>
            <Col md={8}>{props.LeftColumn}</Col>
            <Col md={4}>{props.RightColumn}</Col>
        </Row>
    );
}

export default LargeLeftSmallRight;
