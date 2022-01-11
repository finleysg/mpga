import React from "react";

import { CloseableEditContainer, CloseHandle } from "../../../components/WithEdit";
import usePermissions from "../../../utilities/Permissions";
import { EventProps } from "../eventsPropType";
import EventRegistrationDatesEdit from "./EventRegistrationDatesEdit";
import EventRegisrationDatesView from "./EventRegistrationDatesView";

const EventRegistrationDatesDetail: React.FC<EventProps> = (props) => {
  const { eventDetail } = props;

  const permissions = usePermissions();
  const closeRef = React.useRef<CloseHandle>();

  const handleClose = () => {
    closeRef.current.close();
  };

  return (
    <CloseableEditContainer
      ref={closeRef}
      initEdit={false}
      canEdit={permissions.canManageEvent()}
      viewComponent={<EventRegisrationDatesView eventDetail={eventDetail} />}
      editComponent={<EventRegistrationDatesEdit eventDetail={eventDetail} onClose={handleClose} />}
    />
  );
};

export default EventRegistrationDatesDetail;
