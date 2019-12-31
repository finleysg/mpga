import React from 'react';
import { Announcement } from '../../models/Announcement';
import MarkdownDiv from '../../components/MarkdownDiv';

export interface IAnnouncementView {
    announcement: Announcement,
};

const AnnouncementView: React.FC<IAnnouncementView> = (props) => {
    const announcement = props.announcement;
    return (
        <div>
            <h5>{announcement.title}</h5>
            <MarkdownDiv text={announcement.text} />
            {announcement.externalUrl && 
                <a href={announcement.externalUrl}>{announcement.externalName}</a>}
            {announcement.document && 
                <a href={announcement.document.file}>{announcement.document.title}</a>}
        </div>
    );
}

export default AnnouncementView;
