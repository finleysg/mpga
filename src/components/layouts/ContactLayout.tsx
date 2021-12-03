import { PropsWithChildren } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function ContactLayout(props: PropsWithChildren<{}>) {
    return (
        <Row>
            <Col sm={12} md={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>
                {props.children}
            </Col>
        </Row>
    );
}
