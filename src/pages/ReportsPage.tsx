import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';

import ClubContactsReport from '../features/reports/ClubContactsReport';
import ClubsReport from '../features/reports/ClubsReport';
import ContactsReport from '../features/reports/ContactsReport';
import ReportMenu from '../features/reports/ReportMenu';

const ReportsPage: React.FC = () => {
    const { name } = useParams<{ name: string }>();

    const renderReport = () => {
        switch (name) {
            case "contacts":
                return (
                    <React.Fragment>
                        <h3 className="text-primary">All Contacts</h3>
                        <ContactsReport />
                    </React.Fragment>
                );
            case "club-contacts":
                return (
                    <React.Fragment>
                        <h3 className="text-primary">Club Contacts</h3>
                        <ClubContactsReport />
                    </React.Fragment>
                );
            case "primary-contacts":
                return (
                    <React.Fragment>
                        <h3 className="text-primary">Primary Contacts</h3>
                        <ClubContactsReport filter={"primary"} />
                    </React.Fragment>
                );
            case "mailing-contacts":
                return (
                    <React.Fragment>
                        <h3 className="text-primary">Mailing Contacts</h3>
                        <ClubContactsReport filter={"mailings"} />
                    </React.Fragment>
                );
            case "captains":
                return (
                    <React.Fragment>
                        <h3 className="text-primary">Team Captains</h3>
                        <ClubContactsReport filter={"captains"} />
                    </React.Fragment>
                );
            case "clubs":
                return (
                    <React.Fragment>
                        <h3 className="text-primary">All Clubs</h3>
                        <ClubsReport current={false} />
                    </React.Fragment>
                );
            case "current-clubs":
                return (
                    <React.Fragment>
                        <h3 className="text-primary">Current Clubs</h3>
                        <ClubsReport current={true} />
                    </React.Fragment>
                );
            default:
                return <></>;
        }
    };
    return (
        <Row>
            <Col md={3} lg={2}>
                <ReportMenu />
            </Col>
            <Col md={9} lg={10}>
                {renderReport()}
            </Col>
        </Row>
    );
};

export default ReportsPage;
