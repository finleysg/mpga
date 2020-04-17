import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export interface IThreeColumns {
    Column1: any;
    Column2: any;
    Column3: any;
}

const ThreeColumnsLargeCenter: React.FC<IThreeColumns> = (props) => {
    return (
        <Row>
            <Col md={12} lg={3}>{props.Column1}</Col>
            <Col md={6} lg={6}>{props.Column2}</Col>
            <Col md={6} lg={3}>{props.Column3}</Col>
        </Row>
    );
}

export default ThreeColumnsLargeCenter;
