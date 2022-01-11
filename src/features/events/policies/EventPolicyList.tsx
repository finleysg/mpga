import React, { useState } from "react";

import Button from "react-bootstrap/Button";

import { EventPolicy } from "../../../models/Events";
import usePermissions from "../../../utilities/Permissions";
import { EventProps } from "../eventsPropType";
import EventPolicyDetail from "./EventPolicyDetail";

const EventPolicyList: React.FunctionComponent<EventProps> = (props) => {
  const { eventDetail } = props;

  const permissions = usePermissions();
  const [addNew, setAddNew] = useState(false);

  const canAdd = eventDetail.policies?.findIndex((p) => p.id === 0) || -1 < 0; // no pending add

  const getEmptyPolicy = () => {
    return new EventPolicy({ id: 0, event: eventDetail.id, order: 99, policy: { id: 0 } });
  };
  return (
    <React.Fragment>
      {eventDetail.policies?.map((policy) => {
        return <EventPolicyDetail key={policy.id} edit={false} policy={policy} onClose={() => setAddNew(false)} />;
      })}
      {addNew && <EventPolicyDetail key={0} edit={true} policy={getEmptyPolicy()} onClose={() => setAddNew(false)} />}
      {permissions.canManageEvent() && (
        <Button variant="link" className="text-warning" disabled={!canAdd} onClick={() => setAddNew(true)}>
          New Tournament Policy
        </Button>
      )}
    </React.Fragment>
  );
};

export default EventPolicyList;
