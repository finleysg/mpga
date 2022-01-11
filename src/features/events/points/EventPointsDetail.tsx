import * as React from "react";

import { CloseableEditContainer, CloseHandle } from "../../../components/WithEdit";
import usePermissions from "../../../utilities/Permissions";
import { EventPointsDetailProps } from "../eventsPropType";
import EventPointsEdit from "./EventPointsEdit";
import EventPointsView from "./EventPointsView";

const EventPointsDetail: React.FC<EventPointsDetailProps> = (props) => {
  const { points, edit, onClose } = props;

  const permissions = usePermissions();
  const closeRef = React.useRef<CloseHandle>();

  const handleClose = () => {
    closeRef.current.close();
    onClose();
  };

  return (
    <CloseableEditContainer
      ref={closeRef}
      initEdit={edit}
      canEdit={permissions.canManageEvent()}
      viewComponent={<EventPointsView points={points} />}
      editComponent={<EventPointsEdit points={points} onClose={handleClose} />}
    />
  );
};

export default EventPointsDetail;
