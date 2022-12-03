import React from "react";

import Button from "react-bootstrap/Button";

import { EventPoints } from "../../../models/Events";
import usePermissions from "../../../utilities/Permissions";
import { EventProps } from "../eventsPropType";
import EventPointsDetail from "./EventPointsDetail";

const EventPointsList: React.FC<EventProps> = (props) => {
  const { eventDetail } = props;

  const permissions = usePermissions();
  const [addNew, setAddNew] = React.useState(false);

  const canAdd = eventDetail.playerPoints?.findIndex((p) => p.id === 0) || -1 < 0; // no pending add

  if (eventDetail.playerPoints?.length > 0) {
    return (
      <React.Fragment>
        <h5 className="text-primary">Player Points</h5>
        {eventDetail.playerPoints?.map((p) => {
          return <EventPointsDetail key={p.id} edit={false} points={p} onClose={() => setAddNew(false)} />;
        })}
        {addNew && (
          <EventPointsDetail
            key={0}
            edit={true}
            points={new EventPoints({ id: 0, event: eventDetail.id })}
            onClose={() => setAddNew(false)}
          />
        )}
        {permissions.canManageEvent() && (
          <Button variant="link" className="text-warning" disabled={!canAdd} onClick={() => setAddNew(true)}>
            New Player Points
          </Button>
        )}
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default EventPointsList;
