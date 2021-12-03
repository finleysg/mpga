import React from 'react';

import ReactMarkdown from 'react-markdown';

import { Policy } from '../../models/Policies';

export interface IPolicyViewProps {
    policy: Policy;
}

const PolicyView: React.FC<IPolicyViewProps> = (props) => {
    const { policy } = props;
    return (
        <div>
            <h5 className="text-secondary">{policy.title}</h5>
            <ReactMarkdown children={policy.description} />
        </div>
    );
};

export default PolicyView;
