import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ContactLayout: React.FC<any> = (props) => {
    return (
        <Row>
            <Col md={{ span: 6, offset: 3 }}>{props.children}</Col>
        </Row>
    );
};

export default ContactLayout;
