import * as React from "react";

import Button from "react-bootstrap/Button";

import { EventLinkViewProps, LinkViewType } from "../eventsPropType";

const EventLinkView: React.FunctionComponent<EventLinkViewProps> = (props) => {
  const { eventLink, render } = props;

  const renderView = () => {
    switch (render.viewType) {
      case LinkViewType.Link:
        return (
          <a
            href={eventLink.url}
            className={render.className || ""}
            target={render.external ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {eventLink.title}
          </a>
        );
      case LinkViewType.Button:
        return (
          <Button
            as="a"
            href={eventLink.url}
            target={render.external ? "_blank" : "_self"}
            rel="noopener noreferrer"
            size="sm"
            variant={render.variant || "light"}
          >
            {eventLink.title}
          </Button>
        );
      default:
        return <></>;
    }
  };

  return renderView();
};

export default EventLinkView;
