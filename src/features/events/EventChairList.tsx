import * as React from 'react';
import { EventDetail } from '../../models/Events';

interface IEventDetailProps {
  eventDetail: EventDetail;
}

const EventChairList: React.FunctionComponent<IEventDetailProps> = (props) => {
  const { eventDetail } = props;
  return (
    <React.Fragment>
      <h5 className="text-primary">Tournament Chairs</h5>
      {eventDetail.chairs?.map(chair => {
        return <p key={chair.id} className="mb-1">{chair.chair?.name}</p>;
      })}
    </React.Fragment>
  );
};

export default EventChairList;
