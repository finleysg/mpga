import React from 'react';

import MarkdownDiv from '../../components/MarkdownDiv';
import { Tournament } from '../../models/Events';

export interface ITournamentHistoryOverviewProps {
    tournament: Tournament,
};

const TournamentHistoryOverview: React.FC<ITournamentHistoryOverviewProps> = (props) => {
    const {tournament} = props;
    return (
        <div>
            <h3 className="text-primary mb-3">{tournament.name}</h3>
            <MarkdownDiv text={tournament.description} />
        </div>
    );
}

export default TournamentHistoryOverview;
