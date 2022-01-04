import React, { useRef } from "react";

import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit";
import usePermissions from "../../utilities/Permissions";
import AnnouncementEdit from "./AnnouncementEdit";
import { AnnouncementDetailProps } from "./announcementPropTypes";
import AnnouncementView from "./AnnouncementView";

const AnnouncementDetail: React.FC<AnnouncementDetailProps> = (props) => {
  const { announcement, documents, edit, onClose } = props;
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
      canEdit={permissions.canEditAnnouncements()}
      viewComponent={<AnnouncementView announcement={announcement} />}
      editComponent={<AnnouncementEdit announcement={announcement} documents={documents} onClose={handleClose} />}
    />
  );
};

export default AnnouncementDetail;
