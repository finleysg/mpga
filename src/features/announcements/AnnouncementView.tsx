import React from 'react';

import ReactMarkdown from 'react-markdown';

import { Announcement } from '../../models/Announcement';

export interface IAnnouncementView {
    announcement: Announcement;
}

const AnnouncementView: React.FC<IAnnouncementView> = (props) => {
    const announcement = props.announcement;
    return (
        <div>
            <h5 className="text-secondary">{announcement.title}</h5>
            <ReactMarkdown children={announcement.text} />
            {announcement.externalUrl && (
                <a href={announcement.externalUrl}>{announcement.externalName}</a>
            )}
            {announcement.document && (
                <a href={announcement.document.file}>{announcement.document.title}</a>
            )}
        </div>
    );
};

export default AnnouncementView;
