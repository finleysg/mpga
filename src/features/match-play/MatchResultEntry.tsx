import React, { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import EditContainer from "../../components/EditContainer";
import { MatchResult } from "../../models/Clubs";
import useNavigation from "../../routes/Navigation";
import { IApplicationState } from "../../store";
import AppActions from "../../store/AppActions";
import MatchPlayActions from "../../store/MatchPlayActions";
import usePermissions from "../../utilities/Permissions";
import MatchResultEdit from "./MatchResultEdit";

const MatchResultEntry: React.FC = () => {
    const [doEdit, setDoEdit] = useState(false);
    const matchPlayState = useSelector((state: IApplicationState) => state.matchPlay);
    const dispatch = useDispatch();
    const permissions = usePermissions();
    const navigation = useNavigation();
    const location = useLocation();

    const saveResult = useCallback(
        (result: MatchResult) => {
            dispatch(MatchPlayActions.SaveMatchResult(result));
            setDoEdit(false);
        },
        [dispatch]
    );

    const goRegister = () => {
        dispatch(AppActions.SaveLocation(location.pathname));
        navigation.navigate("/account/register")
    };

    return (
        <React.Fragment>
            <EditContainer
                doEdit={doEdit}
                canEdit={permissions.canPostMatchResult()}
                ToggleEdit={() => setDoEdit(!doEdit)}
                viewComponent={
                    <React.Fragment>
                        {permissions.canPostMatchResult() && (
                            <Button variant="secondary" size="lg" onClick={() => setDoEdit(true)}>
                                Post Result
                            </Button>
                        )}
                        {!permissions.canPostMatchResult() && (
                            <div>
                                <p>
                                    To post a match play result, please log in. If you don't have an account, click the
                                    button below to sign up.
                                </p>
                                <Button
                                    variant="secondary"
                                    className="ml-2"
                                    onClick={() => goRegister()}>
                                    Create an Account
                                </Button>
                            </div>
                        )}
                    </React.Fragment>
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
