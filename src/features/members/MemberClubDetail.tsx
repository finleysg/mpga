import React, { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import LoadingContainer from "../../components/LoadingContainer";
import WithEdit from "../../components/WithEdit";
import constants from "../../constants";
import { Club, Membership } from "../../models/Clubs";
import { IApplicationState } from "../../store";
import MemberClubActions, { ClubForm } from "../../store/MemberClubActions";
import usePermissions from "../../utilities/Permissions";
import ClubDuesPayment from "../payments/ClubDuesPayment";
import MemberClubEdit from "./MemberClubEdit";
import MemberClubView from "./MemberClubView";
import MembershipEdit from "./MembershipEdit";

export const CreateMembershipContainer = styled.div`
    border-width: 1px;
    border-color: silver;
    border-style: solid;
    padding: 10px;
    margin-bottom: 10px;
`;
CreateMembershipContainer.displayName = "CreateMembershipContainer";

const MemberClubDetail: React.FC = () => {
    const [makePayment, setMakePayment] = useState(false);
    const [addMembership, setAddMembership] = useState(false);
    const clubState = useSelector((state: IApplicationState) => state.memberClubs);
    const permissions = usePermissions();
    const dispatch = useDispatch();

    const saveClub = useCallback((club: Club) => dispatch(MemberClubActions.SaveMemberClub(club)), [dispatch]);

    const createMembership = (membership: Membership) => {
        dispatch(MemberClubActions.CreateMembership(membership));
        setAddMembership(false);
    };

    const renderDuesPayment = () => {
        if ((clubState.mostRecentMembership?.year || 0) < constants.MemberClubYear) {
            if (makePayment) {
                return (
                    <ClubDuesPayment
                        club={clubState.selectedClub}
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
                        onClick={() => setMakePayment(true)}>
                        Pay Dues Now
                    </Button>
                );
            }
        }
    };

    const renderMembershipEdit = () => {
        if ((clubState.mostRecentMembership?.year || 0) < constants.MemberClubYear) {
            if (addMembership) {
                return (
                    <CreateMembershipContainer>
                        <MembershipEdit
                            club={clubState.selectedClub}
                            Save={(membershipData) => createMembership(membershipData)}
                            Cancel={() => setAddMembership(false)}
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
        <LoadingContainer hasData={clubState.selectedClub !== undefined}>
            {renderMembershipEdit()}
            <WithEdit
                formName={ClubForm}
                initEdit={false}
                canEdit={permissions.canEditClubPage()}
                viewComponent={
                    <MemberClubView club={clubState.selectedClub} membership={clubState.mostRecentMembership} />
                }
                editComponent={<MemberClubEdit club={clubState.selectedClub} Save={saveClub} />}
            />
            {renderDuesPayment()}
        </LoadingContainer>
    );
};

export default MemberClubDetail;
