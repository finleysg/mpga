import * as React from "react";

import MarkdownRender from "components/MarkdownRender";

import { EventProps } from "../eventsPropType";

const EventFormatView: React.FunctionComponent<EventProps> = (props) => {
  const { eventDetail } = props;
  return (
    <React.Fragment>
      <h5 className="text-primary">Format</h5>
      <MarkdownRender text={eventDetail.description} />
    </React.Fragment>
  );
};

export default EventFormatView;
