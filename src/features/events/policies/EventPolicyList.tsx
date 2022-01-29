import React from "react";

import { EventProps } from "../eventsPropType";
import EventPolicyDetail from "./EventPolicyDetail";

const EventPolicyList: React.FunctionComponent<EventProps> = (props) => {
  const { eventDetail } = props;

  return (
    <React.Fragment>
      {eventDetail.policies?.map((policy) => {
        return <EventPolicyDetail key={policy.id} edit={false} policy={policy} onClose={() => {}} />;
      })}
    </React.Fragment>
  );
};

export default EventPolicyList;
