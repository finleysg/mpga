import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import { IApplicationState } from '../../store';
import ContentActions from '../../store/ContentActions';
import MarkdownContent from './MarkdownContent';

const HomePolicies: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.content);

    const getPolicies = () => {
        return state.policies.get("AU");
    }

    useEffect(() => {
        dispatch(ContentActions.LoadPolicies("AU"));
    }, [dispatch]);

    return (
        <div>
            {state.isBusy ?
            <Loading /> :
            <>
                {getPolicies()?.map(policy => {
                    return <MarkdownContent key={policy.id} title={policy.title} markdown={policy.description} />
                })}
            </>}
        </div>
    );
}

export default HomePolicies;
