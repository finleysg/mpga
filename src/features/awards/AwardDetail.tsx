import { skipToken } from "@reduxjs/toolkit/dist/query";

import React, { useRef } from "react";

import LoadingContainer from "../../components/LoadingContainer";
import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit";
import { Award } from "../../models/Events";
import usePermissions from "../../utilities/Permissions";
import { useGetAwardQuery } from "./awardApi";
import AwardEdit from "./AwardEdit";
import { AwardDetailProps } from "./awardPropTypes";
import AwardView from "./AwardView";

const AwardDetail: React.FC<AwardDetailProps> = (props) => {
  const { awardId } = props;
  const { data, isLoading } = useGetAwardQuery(awardId || skipToken);
  const permissions = usePermissions();
  const closeRef = useRef<CloseHandle>();

  const award = new Award(data);

  const handleClose = () => {
    closeRef.current.close();
  };

  return (
    <LoadingContainer loading={isLoading}>
      <CloseableEditContainer
        ref={closeRef}
        initEdit={false}
        canEdit={permissions.canEditPageContent()}
        viewComponent={<AwardView award={award} />}
        editComponent={<AwardEdit award={award} onClose={handleClose} />}
      />
    </LoadingContainer>
  );
};

export default AwardDetail;
