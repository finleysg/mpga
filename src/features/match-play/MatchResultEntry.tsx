import React, { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import EditContainer from "../../components/EditContainer";
import { MatchResult } from "../../models/Clubs";
import { IApplicationState } from "../../store";
import MatchPlayActions from "../../store/MatchPlayActions";
import MatchResultEdit from "./MatchResultEdit";

const MatchResultEntry: React.FC = () => {
    const [doEdit, setDoEdit] = useState(false);
    const matchPlayState = useSelector((state: IApplicationState) => state.matchPlay);
    const session = useSelector((state: IApplicationState) => state.session);
    const dispatch = useDispatch();

    const saveResult = useCallback(
        (result: MatchResult) => {
            dispatch(MatchPlayActions.SaveMatchResult(result));
            setDoEdit(false);
        },
        [dispatch]
    );

    return (
        <React.Fragment>
            <p>If you don't see a button below to post a result, log in to the website.</p>
            <EditContainer
                doEdit={doEdit}
                canEdit={session.user.isFullEditor}
                ToggleEdit={() => setDoEdit(!doEdit)}
                viewComponent={
                    <Button variant="secondary" size="lg" onClick={() => setDoEdit(true)}>
                        Post Result
                    </Button>
                }
                editComponent={
                    <MatchResultEdit
                        result={new MatchResult({ id: 0 })}
                        groups={matchPlayState.groups}
                        teams={matchPlayState.teams}
                        Save={saveResult}
                        Cancel={() => setDoEdit(false)}
                    />
                }
            />
        </React.Fragment>
    );
};

export default MatchResultEntry;
