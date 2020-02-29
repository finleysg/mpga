import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export interface ITwoColumns {
    LeftColumn: any;
    RightColumn: any;
}

const TwoEvenColumns: React.FC<ITwoColumns> = (props) => {
    return (
        <Row>
            <Col md={true}>{props.LeftColumn}</Col>
            <Col md={true}>{props.RightColumn}</Col>
        </Row>
    );
};

export default TwoEvenColumns;
