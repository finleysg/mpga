import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ITwoColumns } from './TwoEvenColumns';

const LargeLeftSmallRight: React.FC<ITwoColumns> = (props) => {
    return (
        <Row>
            <Col sm={12} md={8} lg={9}>{props.LeftColumn}</Col>
            <Col sm={12} md={4} lg={3}>{props.RightColumn}</Col>
        </Row>
    );
}

export default LargeLeftSmallRight;
