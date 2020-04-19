import React from 'react';
import { Announcement } from '../../models/Announcement';
import ReactMarkdown from "react-markdown";

export interface IAnnouncementView {
    announcement: Announcement,
};

const AnnouncementView: React.FC<IAnnouncementView> = (props) => {
    const announcement = props.announcement;
    return (
        <div>
            <h5 className="text-secondary">{announcement.title}</h5>
            <ReactMarkdown source={announcement.text} escapeHtml={true} />
            {announcement.externalUrl && 
                <a href={announcement.externalUrl}>{announcement.externalName}</a>}
            {announcement.document && 
                <a href={announcement.document.file}>{announcement.document.title}</a>}
        </div>
    );
}

export default AnnouncementView;
