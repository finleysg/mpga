import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ReportMenu() {
    const location = useLocation();
    const navigate = useNavigate();

    const openReport = (name: string) => {
        if (location.pathname.endsWith("reports")) {
            navigate(`${location.pathname}/${name}`);
        } else {
            const lastSegment = location.pathname.lastIndexOf("/");
            const newUrl = `${location.pathname.substring(0, lastSegment)}/${name}`;
            navigate(newUrl);
        }
    };

    return (
        <div>
            <ButtonGroup vertical>
                <Button variant="link" onClick={() => openReport("clubs")}>
                    All Clubs
                </Button>
                <Button variant="link" onClick={() => openReport("current-clubs")}>
                    Current Clubs
                </Button>
                <Button variant="link" onClick={() => openReport("contacts")}>
                    All Contacts
                </Button>
                <Button variant="link" onClick={() => openReport("club-contacts")}>
                    Club Contacts
                </Button>
                <Button variant="link" onClick={() => openReport("primary-contacts")}>
                    Primary Contacts
                </Button>
                <Button variant="link" onClick={() => openReport("mailing-contacts")}>
                    Mailing Contacts
                </Button>
                <Button variant="link" onClick={() => openReport("captains")}>
                    Team Captains
                </Button>
                {/* <Button variant="link" onClick={() => openReport("match-play-teams")}>
                    Match Play Teams
                </Button> */}
            </ButtonGroup>
        </div>
    );
}
