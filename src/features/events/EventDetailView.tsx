import * as React from "react";

import { useSelector } from "react-redux";

import LoadingContainer from "../../components/LoadingContainer";
import { IApplicationState } from "../../store";
import EventChairList from "./EventChairList";
import EventLocationView from "./EventLocationView";
import EventFormatDetail from "./format/EventFormatDetail";
import EventPointsList from "./points/EventPointsList";
import EventPolicyList from "./policies/EventPolicyList";

const EventDetailView: React.FunctionComponent = () => {
  const state = useSelector((state: IApplicationState) => state.events);

  return (
    <LoadingContainer loading={state.currentEvent === undefined}>
      <h1 className="text-secondary">{state.currentEvent.name}</h1>
      <EventLocationView eventDetail={state.currentEvent} />
      <EventFormatDetail eventDetail={state.currentEvent} />
      <EventPolicyList eventDetail={state.currentEvent} />
      <EventPointsList eventDetail={state.currentEvent} />
      <EventChairList eventDetail={state.currentEvent} />
    </LoadingContainer>
  );
};

export default EventDetailView;
