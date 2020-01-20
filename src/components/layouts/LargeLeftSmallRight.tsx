import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export interface ITwoColumns {
    Column1: any;
    Column2: any;
}

const LargeLeftSmallRight: React.FC<ITwoColumns> = (props) => {
    return (
        <Row>
            <Col md={8}>{props.Column1}</Col>
            <Col md={4}>{props.Column2}</Col>
        </Row>
    );
}

export default LargeLeftSmallRight;
