import React from 'react';
import Card from "react-bootstrap/Card";
import { Announcement } from '../models/Announcement';

export interface IAnnouncementDetail {
    announcement: Announcement,
};

const AnnouncementDetail: React.FC<IAnnouncementDetail> = (props) => {
    const announcement = props.announcement;
    return (
        <Card>
            <Card.Body>
                <Card.Title>{announcement.title}</Card.Title>
                <Card.Text>
                    {announcement.text}
                </Card.Text>
                {announcement.externalUrl && 
                    <Card.Link href={announcement.externalUrl}>{announcement.externalName}</Card.Link>}
                {announcement.document && 
                    <Card.Link href={announcement.document.file}>{announcement.document.title}</Card.Link>}
            </Card.Body>
        </Card>
    );
}

export default AnnouncementDetail;
