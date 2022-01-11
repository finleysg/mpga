import * as React from "react";

import EventChairList from "./EventChairList";
import EventLocationView from "./EventLocationView";
import { EventProps } from "./eventsPropType";
import EventFormatDetail from "./format/EventFormatDetail";
import EventPointsList from "./points/EventPointsList";
import EventPolicyList from "./policies/EventPolicyList";

const EventDetailView: React.FC<EventProps> = (props) => {
  const { eventDetail } = props;

  return (
    <div>
      <h1 className="text-secondary">{eventDetail.name}</h1>
      <EventLocationView eventDetail={eventDetail} />
      <EventFormatDetail eventDetail={eventDetail} />
      <EventPolicyList eventDetail={eventDetail} />
      <EventPointsList eventDetail={eventDetail} />
      <EventChairList eventDetail={eventDetail} />
    </div>
  );
};

export default EventDetailView;
