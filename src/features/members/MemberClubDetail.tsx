import React, { useRef, useState } from "react";

import Button from "react-bootstrap/Button";
import styled from "styled-components";

import LoadingContainer from "../../components/LoadingContainer";
import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit";
import constants from "../../constants";
import { Club, Membership } from "../../models/Clubs";
import { useGetMembershipsForClubQuery } from "../../services/MpgaApi";
import usePermissions from "../../utilities/Permissions";
import ClubDuesPayment from "../payments/ClubDuesPayment";
import MemberClubEdit from "./MemberClubEdit";
import MemberClubView from "./MemberClubView";
import { ClubProps } from "./MemberPropTypes";
import MembershipEdit from "./MembershipEdit";

export const CreateMembershipContainer = styled.div`
  border-width: 1px;
  border-color: silver;
  border-style: solid;
  padding: 10px;
  margin-bottom: 10px;
`;
CreateMembershipContainer.displayName = "CreateMembershipContainer";

function MemberClubDetail(props: ClubProps) {
  const { club } = props;

  const [makePayment, setMakePayment] = useState(false);
  const [addMembership, setAddMembership] = useState(false);
  const permissions = usePermissions();
  const { data: memberships, isLoading } = useGetMembershipsForClubQuery(club.id);
  const closeRef = useRef<CloseHandle>();

  const getMostRecentMembership = () => {
    const membership = memberships?.length > 0 ? memberships[0] : null;
    if (membership) {
      return new Membership(membership);
    }
    return null;
  };

  const handleSaveClub = (_club: Club) => {
    closeRef.current.close();
  };

  const handleCreateMembership = (_membership: Membership) => {
    setAddMembership(false);
  };

  const renderDuesPayment = () => {
    if ((getMostRecentMembership()?.year || 0) < constants.MemberClubYear) {
      if (makePayment) {
        return (
          <ClubDuesPayment
            club={club}
            amountDue={constants.MembershipDues}
            title={`Pay ${constants.MemberClubYear} Dues Online`}
            Cancel={() => setMakePayment(false)}
          />
        );
      } else {
        return (
          <Button
            variant="outline-secondary"
            type="submit"
            size="lg"
            className="mt-3"
            onClick={() => setMakePayment(true)}
          >
            Pay Dues Now
          </Button>
        );
      }
    }
  };

  const renderMembershipEdit = () => {
    if ((getMostRecentMembership()?.year || 0) < constants.MemberClubYear) {
      if (addMembership) {
        return (
          <CreateMembershipContainer>
            <MembershipEdit
              club={club}
              onSave={(membershipData) => handleCreateMembership(membershipData)}
              onCancel={() => setAddMembership(false)}
            />
          </CreateMembershipContainer>
        );
      } else if (permissions.canEnterPayment()) {
        return (
          <Button variant="link" className="text-warning" onClick={() => setAddMembership(true)}>
            Enter Dues Payment
          </Button>
        );
      } else {
        return <></>;
      }
    }
  };

  return (
    <LoadingContainer hasData={!isLoading}>
      {renderMembershipEdit()}
      <CloseableEditContainer
        ref={closeRef}
        initEdit={false}
        canEdit={permissions.canEditClubPage()}
        viewComponent={<MemberClubView club={club} membership={getMostRecentMembership()} />}
        editComponent={<MemberClubEdit club={club} onSave={handleSaveClub} onCancel={() => closeRef.current.close()} />}
      />
      {renderDuesPayment()}
    </LoadingContainer>
  );
}

export default MemberClubDetail;
