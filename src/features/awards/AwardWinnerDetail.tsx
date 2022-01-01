import React, { useRef } from "react";

import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit";
import { AwardWinner } from "../../models/Events";
import usePermissions from "../../utilities/Permissions";
import { AwardWinnerDetailProps } from "./AwardPropTypes";
import AwardWinnerEdit from "./AwardWinnerEdit";
import AwardWinnerView from "./AwardWinnerView";

const AwardWinnerDetail: React.FC<AwardWinnerDetailProps> = (props) => {
  const { edit, winner, onClose } = props;
  const permissions = usePermissions();
  const closeRef = useRef<CloseHandle>();

  const handleSave = (_winner: AwardWinner) => {
    closeRef.current.close();
    onClose();
  };

  const handleCancel = () => {
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
      editComponent={<AwardWinnerEdit winner={winner} onCancel={handleCancel} onSave={handleSave} />}
    />
  );
};

export default AwardWinnerDetail;
