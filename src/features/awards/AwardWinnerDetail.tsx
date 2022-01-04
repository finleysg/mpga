import React, { useRef } from "react";

import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit";
import usePermissions from "../../utilities/Permissions";
import { AwardWinnerDetailProps } from "./awardPropTypes";
import AwardWinnerEdit from "./AwardWinnerEdit";
import AwardWinnerView from "./AwardWinnerView";

const AwardWinnerDetail: React.FC<AwardWinnerDetailProps> = (props) => {
  const { edit, winner, onClose } = props;
  const permissions = usePermissions();
  const closeRef = useRef<CloseHandle>();

  const handleClose = () => {
    closeRef.current.close();
    onClose();
  };

  return (
    <CloseableEditContainer
      ref={closeRef}
      onClose={onClose}
      initEdit={edit}
      canEdit={permissions.canEditAwards()}
      viewComponent={<AwardWinnerView winner={winner} />}
      editComponent={<AwardWinnerEdit winner={winner} onClose={handleClose} />}
    />
  );
};

export default AwardWinnerDetail;
