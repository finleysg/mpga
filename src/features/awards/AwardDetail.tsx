import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditContainer from "../../components/EditContainer";
import LoadingContainer from "../../components/LoadingContainer";
import { Award } from "../../models/Events";
import { IApplicationState } from "../../store";
import AwardActions from "../../store/AwardActions";
import usePermissions from "../../utilities/Permissions";
import AwardEdit from "./AwardEdit";
import AwardView from "./AwardView";

export interface IAwardDetailProps {
    awardName: string;
}

const AwardDetail: React.FC<IAwardDetailProps> = props => {
    const { awardName } = props;
    const [doEdit, setDoEdit] = useState(false);
    const awardState = useSelector((state: IApplicationState) => state.awards);
    const dispatch = useDispatch();
    const permissions = usePermissions();

    const getAward = (): Award => {
        return awardState.data.get(awardName) || new Award({});
    };

    const saveContent = useCallback((award: Award) => {
        dispatch(AwardActions.SaveAward(award));
        setDoEdit(false);
    }, [dispatch]);

    useEffect(() => {
        dispatch(AwardActions.LoadAward(awardName));
    }, [dispatch, awardName]);

    return (
        <LoadingContainer hasData={getAward().id !== undefined}>
            <EditContainer
                doEdit={doEdit}
                canEdit={permissions.canEditPageContent()}
                ToggleEdit={() => setDoEdit(!doEdit)}
                viewComponent={<AwardView award={getAward()} />}
                editComponent={<AwardEdit award={getAward()} Save={saveContent} />}
            />
        </LoadingContainer>
    );
};

export default AwardDetail;
