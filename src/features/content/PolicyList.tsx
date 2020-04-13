import React, { useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading";
import { Policy } from "../../models/Policies";
import { IApplicationState } from "../../store";
import ContentActions from "../../store/ContentActions";
import PolicyDetail from "./PolicyDetail";
import usePermissions from "../../utilities/Permissions";

export interface IPolicyListProps {
    policyCode: string;
}

const PolicyList: React.FC<IPolicyListProps> = (props) => {
    const dispatch = useDispatch();
    const permissions = usePermissions();
    const state = useSelector((state: IApplicationState) => state.content);

    const getPolicies = () => {
        return state.policies.get(props.policyCode);
    };

    const savePolicy = useCallback((policy: Policy) => dispatch(ContentActions.SavePolicy(policy)), [dispatch]);

    const deletePolicy = useCallback((policy: Policy) => dispatch(ContentActions.DeletePolicy(policy)), [dispatch]);

    useEffect(() => {
        dispatch(ContentActions.LoadPolicies(props.policyCode));
    }, [dispatch, props.policyCode]);

    return (
        <div>
            {state.isBusy ? (
                <Loading />
            ) : (
                <>
                    {getPolicies()?.map((policy) => {
                        return (
                            <PolicyDetail
                                key={policy.id}
                                policy={policy}
                                edit={policy.id === 0}
                                Cancel={() => dispatch(ContentActions.CancelNewPolicy(props.policyCode))}
                                Delete={deletePolicy}
                                Save={savePolicy}
                            />
                        );
                    })}
                </>
            )}
            {permissions.canEditPolicies() && (
                <Button
                    variant="link"
                    className="text-warning"
                    onClick={() => dispatch(ContentActions.AddNewPolicy(props.policyCode))}>
                    Add New
                </Button>
            )}
        </div>
    );
};

export default PolicyList;
