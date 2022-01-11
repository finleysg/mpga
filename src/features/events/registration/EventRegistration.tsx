import React from "react";

import { EventProps } from "../eventsPropType";
import EventRegistrationDatesDetail from "./EventRegistrationDatesDetail";

const EventRegistration: React.FC<EventProps> = (props) => {
  const { eventDetail } = props;

  return (
    <div>
      <h3 className="text-primary">Registration</h3>
      <EventRegistrationDatesDetail eventDetail={eventDetail} />
    </div>
  );
};

export default EventRegistration;
