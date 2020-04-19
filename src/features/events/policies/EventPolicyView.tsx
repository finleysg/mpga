import React from 'react';

import ReactMarkdown from "react-markdown";
import { EventPolicy } from '../../../models/Events';

export interface IEventPolicyViewProps {
    policy: EventPolicy,
}

const EventPolicyView: React.FC<IEventPolicyViewProps> = (props) => {
    const {policy} = props.policy;
    return (
        <div>
            <h5 className="text-primary">{policy?.title}</h5>
            <ReactMarkdown source={policy?.description} escapeHtml={true} />
        </div>
    );
}

export default EventPolicyView;
