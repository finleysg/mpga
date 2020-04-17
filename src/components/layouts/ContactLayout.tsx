import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ContactLayout: React.FC<any> = (props) => {
    return (
        <Row>
            <Col sm={12} md={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>{props.children}</Col>
        </Row>
    );
};

export default ContactLayout;
