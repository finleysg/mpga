import React, { useRef } from "react";

import { toast } from "react-toastify";

import LoadingContainer from "../../components/LoadingContainer";
import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit";
import { Award } from "../../models/Events";
import { useGetAwardQuery, useUpdateAwardMutation } from "../../services/MpgaApi";
import usePermissions from "../../utilities/Permissions";
import AwardEdit from "./AwardEdit";
import { AwardDetailProps } from "./AwardPropTypes";
import AwardView from "./AwardView";

const AwardDetail: React.FC<AwardDetailProps> = (props) => {
  const { awardId } = props;
  const { data, isLoading } = useGetAwardQuery(awardId);
  const [updateAward, { isLoading: isUpdating }] = useUpdateAwardMutation();
  const permissions = usePermissions();
  const closeRef = useRef<CloseHandle>();

  const award = new Award(data);

  const handleSave = async (award: Award) => {
    await updateAward(award.prepJson())
      .unwrap()
      .then(() => {
        toast.success(`Changes to ${award.name} have been saved.`);
        closeRef.current.close();
      })
      .catch((error) => {
        toast.error("💣 " + error);
      });
  };

  return (
    <LoadingContainer hasData={!isLoading && !isUpdating}>
      <CloseableEditContainer
        ref={closeRef}
        initEdit={false}
        canEdit={permissions.canEditPageContent()}
        viewComponent={<AwardView award={award} />}
        editComponent={<AwardEdit award={award} Save={handleSave} />}
      />
    </LoadingContainer>
  );
};

export default AwardDetail;
