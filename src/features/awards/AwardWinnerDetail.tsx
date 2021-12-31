import React, { useRef } from "react";

import { toast } from "react-toastify";

import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit";
import { AwardWinner } from "../../models/Events";
import { useAddWinnerMutation, useUpdateWinnerMutation } from "../../services/MpgaApi";
import usePermissions from "../../utilities/Permissions";
import { AwardWinnerDetailProps } from "./AwardPropTypes";
import AwardWinnerEdit from "./AwardWinnerEdit";
import AwardWinnerView from "./AwardWinnerView";

const AwardWinnerDetail: React.FC<AwardWinnerDetailProps> = (props) => {
  const { edit, award, winner, onClose: clear } = props;
  const permissions = usePermissions();
  const [updateWinner] = useUpdateWinnerMutation();
  const [addWinner] = useAddWinnerMutation();
  const closeRef = useRef<CloseHandle>();

  const handleSave = async (winner: AwardWinner) => {
    const data = winner.prepJson();
    const mutation = winner.id > 0 ? updateWinner(data) : addWinner(data);
    await mutation
      .unwrap()
      .then(() => {
        toast.success(`${winner.winner} has been saved for ${award.name}.`);
        closeRef.current.close();
        clear();
      })
      .catch((error) => {
        toast.error("💣 " + error);
      });
  };

  const handleCancel = () => {
    closeRef.current.close();
    clear();
  };

  return (
    <CloseableEditContainer
      ref={closeRef}
      onClose={() => clear()}
      initEdit={edit}
      canEdit={permissions.canEditAwards()}
      viewComponent={<AwardWinnerView winner={winner} />}
      editComponent={<AwardWinnerEdit winner={winner} Cancel={handleCancel} Save={handleSave} />}
    />
  );
};

export default AwardWinnerDetail;
