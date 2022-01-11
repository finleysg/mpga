import * as React from "react";

import { CloseableEditContainer, CloseHandle } from "../../../components/WithEdit";
import usePermissions from "../../../utilities/Permissions";
import { EventPolicyDetailProps } from "../eventsPropType";
import EventPolicyEdit from "./EventPolicyEdit";
import EventPolicyView from "./EventPolicyView";

const EventPolicyDetail: React.FC<EventPolicyDetailProps> = (props) => {
  const { policy, edit, onClose } = props;

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
      viewComponent={<EventPolicyView policy={policy} />}
      editComponent={<EventPolicyEdit policy={policy} onClose={handleClose} />}
    />
  );
};

export default EventPolicyDetail;
