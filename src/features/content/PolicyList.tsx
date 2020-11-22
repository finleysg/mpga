import React, { useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import { Policy } from "../../models/Policies";
import { IApplicationState } from "../../store";
import ContentActions from "../../store/ContentActions";
import PolicyDetail from "./PolicyDetail";
import usePermissions from "../../utilities/Permissions";
import LoadingContainer from "../../components/LoadingContainer";

export interface IPolicyListProps {
    policyCode: string;
}

const PolicyList: React.FC<IPolicyListProps> = (props) => {
    const { policyCode } = props;
    const dispatch = useDispatch();
    const permissions = usePermissions();
    const state = useSelector((state: IApplicationState) => state.content);

    const getPolicies = () => {
        return state.policies.get(policyCode);
    };

    const cancelPolicy = useCallback(() => dispatch(ContentActions.CancelNewPolicy(policyCode)), [dispatch, policyCode])
    const savePolicy = useCallback((policy: Policy) => dispatch(ContentActions.SavePolicy(policy)), [dispatch]);
    const deletePolicy = useCallback((policy: Policy) => dispatch(ContentActions.DeletePolicy(policy)), [dispatch]);

    useEffect(() => {
        dispatch(ContentActions.LoadPolicies(policyCode));
    }, [dispatch, policyCode]);

    return (
        <div>
            {permissions.canEditPolicies() && (
                <Button
                    variant="link"
                    className="text-warning"
                    onClick={() => dispatch(ContentActions.AddNewPolicy(props.policyCode))}>
                    Add New
                </Button>
            )}
            <LoadingContainer hasData={getPolicies() !== undefined}>
                {getPolicies()?.map((policy) => {
                    return (
                        <PolicyDetail
                            key={policy.id}
                            policy={policy}
                            edit={policy.id === 0}
                            Cancel={cancelPolicy}
                            Delete={deletePolicy}
                            Save={savePolicy}
                        />
                    );
                })}
            </LoadingContainer>
        </div>
    );
};

export default PolicyList;
