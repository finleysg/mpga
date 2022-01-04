import React, { useRef } from "react";

import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit";
import usePermissions from "../../utilities/Permissions";
import ClubContactEdit from "./ClubContactEdit";
import ClubContactView from "./ClubContactView";
import { ClubContactDetailProps } from "./memberClubPropTypes";

const ClubContactDetail: React.FC<ClubContactDetailProps> = (props) => {
  const { clubContact, edit, onClose } = props;

  const permissions = usePermissions();
  const closeRef = useRef<CloseHandle>();

  const handleClose = () => {
    closeRef.current.close();
    onClose();
  };

  return (
    <CloseableEditContainer
      ref={closeRef}
      initEdit={edit}
      canEdit={permissions.canEditClubPage()}
      viewComponent={<ClubContactView clubContact={clubContact} />}
      editComponent={<ClubContactEdit clubContact={clubContact} onClose={handleClose} />}
    />
  );
};

export default ClubContactDetail;
