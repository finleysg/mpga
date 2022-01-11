import * as React from "react";

import { EventProps } from "./eventsPropType";

const EventChairList: React.FunctionComponent<EventProps> = (props) => {
  const { eventDetail } = props;
  return (
    <React.Fragment>
      <h5 className="text-primary">Tournament Chairs</h5>
      {eventDetail.chairs?.map((chair) => {
        return (
          <p key={chair.id} className="mb-1">
            {chair.chair?.name}
          </p>
        );
      })}
    </React.Fragment>
  );
};

export default EventChairList;
