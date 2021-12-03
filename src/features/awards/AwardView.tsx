import React from 'react';

import ReactMarkdown from 'react-markdown';

import { Award } from '../../models/Events';
import AwardWinnerList from './AwardWinnerList';

export interface IAwardViewProps {
    award: Award;
}

const AwardView: React.FC<IAwardViewProps> = (props) => {
    const { award } = props;
    return (
        <div>
            <h3 className="text-primary">{award.name}</h3>
            <ReactMarkdown children={award.description} />
            <AwardWinnerList award={award} />
        </div>
    );
};

export default AwardView;
