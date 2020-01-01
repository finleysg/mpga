import React, { useCallback, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import { Policy } from '../../models/Policies';
import { IApplicationState } from '../../store';
import ContentActions from '../../store/ContentActions';
import PolicyDetail from './PolicyDetail';

export interface IPolicyListProps {
    policyCode: string;
}

const PolicyList: React.FC<IPolicyListProps> = (props) => {
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.content);
    const session = useSelector((state: IApplicationState) => state.session);

    const getPolicies = () => {
        return state.policies.get(props.policyCode);
    }

    const savePolicy = useCallback(
        (policy: Policy) => dispatch(ContentActions.SavePolicy(policy)),
        [dispatch]
    )

    const deletePolicy = useCallback(
        (policy: Policy) => dispatch(ContentActions.DeletePolicy(policy)),
        [dispatch]
    )

    useEffect(() => {
        dispatch(ContentActions.LoadPolicies(props.policyCode));
    }, [dispatch, props.policyCode]);

    return (
        <div>
            {state.isBusy ?
                <Loading /> :
                <>
                    {getPolicies()?.map(policy => {
                        return <PolicyDetail key={policy.id}
                            policy={policy}
                            edit={policy.id === 0}
                            Cancel={() => dispatch(ContentActions.CancelNewPolicy(props.policyCode))}
                            Delete={deletePolicy}
                            Save={savePolicy} />
                    })}
                </>}
            {session.user.isFullEditor && <Button variant="outline-secondary"
                size="sm"
                onClick={() => dispatch(ContentActions.AddNewPolicy(props.policyCode))}>
                Add Policy
        </Button>}
        </div>
    );
}

export default PolicyList;
