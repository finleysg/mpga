import React from "react";

import MarkdownRender from "../../components/MarkdownRender";
import { AnnouncementViewProps } from "./announcementPropTypes";

const AnnouncementView: React.FC<AnnouncementViewProps> = (props) => {
  const announcement = props.announcement;
  return (
    <div>
      <h5 className="text-secondary">{announcement.title}</h5>
      <MarkdownRender text={announcement.text} />
      {announcement.externalUrl && <a href={announcement.externalUrl}>{announcement.externalName}</a>}
      {announcement.document && <a href={announcement.document.file}>{announcement.document.title}</a>}
    </div>
  );
};

export default AnnouncementView;
