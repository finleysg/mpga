import React, { useState } from "react";

import EditContainer from "../../components/EditContainer";
import { AwardWinner } from "../../models/Events";
import usePermissions from "../../utilities/Permissions";
import AwardWinnerEdit, { IAwardWinnerEditProps } from "./AwardWinnerEdit";
import AwardWinnerView from "./AwardWinnerView";

export interface IAwardWinnerDetailProps extends IAwardWinnerEditProps {
    edit: boolean;
}

const AwardWinnerDetail: React.FC<IAwardWinnerDetailProps> = (props) => {
    const { winner, edit, Cancel, Save } = props;
    const [doEdit, setDoEdit] = useState(edit);
    const permissions = usePermissions();

    const saveWinner = (winner: AwardWinner) => {
        setDoEdit(false);
        Save(winner);
    };

    return (
        <EditContainer
            doEdit={doEdit}
            canEdit={permissions.canEditAwards()}
            ToggleEdit={() => setDoEdit(!doEdit)}
            viewComponent={<AwardWinnerView winner={winner} />}
            editComponent={<AwardWinnerEdit winner={winner} Cancel={Cancel} Save={saveWinner} />}
        />
    );
};

export default AwardWinnerDetail;
