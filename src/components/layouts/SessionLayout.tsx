import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SessionLayout: React.FC<any> = (props) => {
    return (
        <Row>
            <Col 
                xs={{ span: 12 }} 
                sm={{ span: 10, offset: 1 }} 
                md={{ span: 8, offset: 2 }} 
                lg={{ span: 4, offset: 4 }}>
                {props.children}
            </Col>
        </Row>
    );
};

export default SessionLayout;
