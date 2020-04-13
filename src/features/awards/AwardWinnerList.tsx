import React, { useCallback } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";

import { Award, AwardWinner } from "../../models/Events";
import AwardActions from "../../store/AwardActions";
import usePermissions from "../../utilities/Permissions";
import AwardWinnerDetail from "./AwardWinnerDetail";

export interface IAwardWinnerListProps {
    award: Award;
}

const AwardWinnerList: React.FC<IAwardWinnerListProps> = (props) => {
    const { award } = props;
    const dispatch = useDispatch();
    const permissions = usePermissions();

    const saveAwardWinner = useCallback(
        (winner: AwardWinner) => {
            dispatch(AwardActions.SaveAwardWinner(award, winner));
        },
        [dispatch, award]
    );

    return (
        <div>
            {permissions.canEditAwards() && (
                <Button
                    variant="link"
                    className="text-warning"
                    onClick={() => dispatch(AwardActions.AddNewAwardWinner(award.name))}>
                    Add New
                </Button>
            )}
            {award.winners.map((winner: AwardWinner) => (
                <AwardWinnerDetail
                    key={winner.id}
                    edit={winner.id === 0}
                    winner={winner}
                    Cancel={() => dispatch(AwardActions.CancelNewAwardWinner(award.name))}
                    Save={saveAwardWinner}
                />
            ))}
        </div>
    );
};

export default AwardWinnerList;
