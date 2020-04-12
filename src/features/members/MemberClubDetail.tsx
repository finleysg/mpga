import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditableDiv from "../../components/EditableDiv";
import LoadingContainer from "../../components/LoadingContainer";
import constants from "../../constants";
import { Club } from "../../models/Clubs";
import { IApplicationState } from "../../store";
import MemberClubActions from "../../store/MemberClubActions";
import ClubDuesPayment from "../payments/ClubDuesPayment";
import MemberClubEdit from "./MemberClubEdit";
import MemberClubView from "./MemberClubView";
import Button from "react-bootstrap/Button";

const MemberClubDetail: React.FC = () => {
    const [makePayment, setMakePayment] = useState(false);
    const clubState = useSelector((state: IApplicationState) => state.memberClubs);
    const session = useSelector((state: IApplicationState) => state.session);
    const dispatch = useDispatch();

    const saveClub = useCallback((club: Club) => dispatch(MemberClubActions.SaveMemberClub(club)), [dispatch]);

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

    return (
        <LoadingContainer hasData={clubState.selectedClub !== undefined}>
            <EditableDiv
                initEdit={false}
                canEdit={session.user.isFullEditor}
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
