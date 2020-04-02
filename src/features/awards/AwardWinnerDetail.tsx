import React, { useState } from "react";
import { useSelector } from "react-redux";

import EditContainer from "../../components/EditContainer";
import { IApplicationState } from "../../store";
import AwardWinnerEdit, { IAwardWinnerEditProps } from "./AwardWinnerEdit";
import AwardWinnerView from "./AwardWinnerView";
import { AwardWinner } from "../../models/Events";

export interface IAwardWinnerDetailProps extends IAwardWinnerEditProps {
    edit: boolean;
}

const AwardWinnerDetail: React.FC<IAwardWinnerDetailProps> = props => {
    const { winner, edit, Cancel, Save } = props;
    const [doEdit, setDoEdit] = useState(edit);
    const session = useSelector((state: IApplicationState) => state.session);

    const saveWinner = (winner: AwardWinner) => {
        setDoEdit(false);
        Save(winner);
    }
    
    return (
        <EditContainer doEdit={doEdit} canEdit={session.user.isFullEditor} ToggleEdit={() => setDoEdit(!doEdit)}
            viewComponent={<AwardWinnerView winner={winner} />}
            editComponent={<AwardWinnerEdit winner={winner} Cancel={Cancel} Save={saveWinner} />}>
        </EditContainer>
    );
};

export default AwardWinnerDetail;
