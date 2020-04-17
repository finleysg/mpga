import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export interface IThreeColumns {
    Column1: any;
    Column2: any;
    Column3: any;
}

const ThreeEvenColumns: React.FC<IThreeColumns> = (props) => {
    return (
        <Row>
            <Col lg={true}>{props.Column1}</Col>
            <Col lg={true}>{props.Column2}</Col>
            <Col lg={true}>{props.Column3}</Col>
        </Row>
    );
}

export default ThreeEvenColumns;
