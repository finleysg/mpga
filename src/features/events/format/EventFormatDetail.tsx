import React from "react";

import { CloseableEditContainer, CloseHandle } from "../../../components/WithEdit";
import usePermissions from "../../../utilities/Permissions";
import { EventProps } from "../eventsPropType";
import EventFormatEdit from "./EventFormatEdit";
import EventFormatView from "./EventFormatView";

const EventFormatDetail: React.FunctionComponent<EventProps> = (props) => {
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
      viewComponent={<EventFormatView eventDetail={eventDetail} />}
      editComponent={<EventFormatEdit eventDetail={eventDetail} onClose={handleClose} />}
    />
  );
};

export default EventFormatDetail;
