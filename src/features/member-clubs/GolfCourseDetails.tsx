import React, { useRef } from "react";

import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit";
import usePermissions from "../../utilities/Permissions";
import GolfCourseEdit from "./GolfCourseEdit";
import GolfCourseView from "./GolfCourseView";
import { ClubProps } from "./memberClubPropTypes";

const GolfCourseDetail: React.FC<ClubProps> = (props) => {
  const { club } = props;

  const permissions = usePermissions();
  const closeRef = useRef<CloseHandle>();

  const handleClose = () => {
    closeRef.current.close();
  };

  return (
    <CloseableEditContainer
      ref={closeRef}
      initEdit={false}
      canEdit={permissions.canEditClubPage()}
      viewComponent={<GolfCourseView club={club} />}
      editComponent={<GolfCourseEdit club={club} onClose={handleClose} />}
    />
  );
};

export default GolfCourseDetail;
