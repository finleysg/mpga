import React, { useRef } from "react";

import LoadingContainer from "../../components/LoadingContainer";
import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit";
import { Award } from "../../models/Events";
import { useGetAwardQuery } from "../../services/AwardEndpoints";
import usePermissions from "../../utilities/Permissions";
import AwardEdit from "./AwardEdit";
import { AwardDetailProps } from "./AwardPropTypes";
import AwardView from "./AwardView";

const AwardDetail: React.FC<AwardDetailProps> = (props) => {
  const { awardId } = props;
  const { data, isLoading } = useGetAwardQuery(awardId);
  const permissions = usePermissions();
  const closeRef = useRef<CloseHandle>();

  const award = new Award(data);

  const handleCancel = () => {
    closeRef.current.close();
  };

  const handleSave = (_award: Award) => {
    closeRef.current.close();
  };

  return (
    <LoadingContainer hasData={!isLoading}>
      <CloseableEditContainer
        ref={closeRef}
        initEdit={false}
        canEdit={permissions.canEditPageContent()}
        viewComponent={<AwardView award={award} />}
        editComponent={<AwardEdit award={award} onSave={handleSave} onCancel={handleCancel} />}
      />
    </LoadingContainer>
  );
};

export default AwardDetail;
