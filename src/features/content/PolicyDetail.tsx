import React, { useRef } from "react";

import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit";
import usePermissions from "../../utilities/Permissions";
import { PolicyDetailProps } from "./contentPropTypes";
import PolicyEdit from "./PolicyEdit";
import PolicyView from "./PolicyView";

const PolicyDetail: React.FC<PolicyDetailProps> = (props) => {
  const { policy, edit, onClose } = props;
  const permissions = usePermissions();
  const closeRef = useRef<CloseHandle>();

  const handleClose = () => {
    closeRef.current?.close();
    onClose();
  };

  return (
    <CloseableEditContainer
      ref={closeRef}
      initEdit={edit}
      canEdit={permissions.canEditPolicies()}
      viewComponent={<PolicyView policy={policy} />}
      editComponent={<PolicyEdit policy={policy} onClose={handleClose} />}
    />
  );
};

export default PolicyDetail;
