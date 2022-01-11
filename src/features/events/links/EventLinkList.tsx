import React from "react";

import { EventLink } from "../../../models/Events";
import { EventLinkListProps, ILinkRenderProps, LinkViewType } from "../eventsPropType";
import EventLinkLinkDetail from "./EventLinkDetail";

const render = {
  viewType: LinkViewType.Link,
  external: true,
  variant: "secondary",
} as ILinkRenderProps;

const EventLinkList: React.FC<EventLinkListProps> = (props) => {
  const { eventDetail, linkType, title } = props;
  const links = eventDetail.links?.filter((l) => l.linkType === linkType);

  const renderLink = (link: EventLink) => {
    return <EventLinkLinkDetail key={link.id} eventLink={link} render={render} edit={link.id === 0} />;
  };

  return (
    <div>
      {links && links.length > 0 && (
        <React.Fragment>
          <h5 className="text-primary mt-1">{title}</h5>
          {links?.map((link: EventLink) => renderLink(link))}
        </React.Fragment>
      )}
    </div>
  );
};

export default EventLinkList;
