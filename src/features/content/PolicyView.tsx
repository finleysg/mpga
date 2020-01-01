import React from 'react';

import MarkdownDiv from '../../components/MarkdownDiv';
import { Policy } from '../../models/Policies';

export interface IPolicyViewProps {
    policy: Policy,
}

const PolicyView: React.FC<IPolicyViewProps> = (props) => {
    const {policy} = props;
    return (
        <div>
            <h5>{policy.title}</h5>
            <MarkdownDiv text={policy.description} />
        </div>
    );
}

export default PolicyView;
