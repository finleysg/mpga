import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Outlet } from 'react-router';

export default function SessionLayout() {
    return (
        <Row>
            <Col
                xs={{ span: 12 }}
                sm={{ span: 10, offset: 1 }}
                md={{ span: 8, offset: 2 }}
                lg={{ span: 4, offset: 4 }}>
                <Outlet />
            </Col>
        </Row>
    );
}
