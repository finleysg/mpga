import React from "react";

import WithEdit from "../../components/WithEdit";
import { AwardWinner } from "../../models/Events";
import usePermissions from "../../utilities/Permissions";
import AwardWinnerEdit, { IAwardWinnerEditProps } from "./AwardWinnerEdit";
import AwardWinnerView from "./AwardWinnerView";
import { AwardWinnerForm } from "../../store/AwardActions";

export interface IAwardWinnerDetailProps extends IAwardWinnerEditProps {
    edit: boolean;
}

const AwardWinnerDetail: React.FC<IAwardWinnerDetailProps> = (props) => {
    const { edit, winner, Cancel, Save } = props;
    const permissions = usePermissions();

    const saveWinner = (winner: AwardWinner) => {
        Save(winner);
    };

    return (
        <WithEdit
            formName={AwardWinnerForm}
            initEdit={edit}
            canEdit={permissions.canEditAwards()}
            viewComponent={<AwardWinnerView winner={winner} />}
            editComponent={<AwardWinnerEdit winner={winner} Cancel={Cancel} Save={saveWinner} />}
        />
    );
};

export default AwardWinnerDetail;
