import * as React from 'react';

import MarkdownDiv from '../../components/MarkdownDiv';
import { Tournament } from '../../models/Events';
import { NavLink } from 'react-router-dom';

export interface ITournamentViewProps {
    tournament: Tournament,
}

const TournamentView: React.FunctionComponent<ITournamentViewProps> = (props) => {
    const {tournament} = props;
    return (
        <div>
            <h4 className="text-secondary mb-3">{tournament.name}</h4>
            <MarkdownDiv text={tournament.description} />
            <NavLink to={`/tournaments/t/${tournament.systemName}/history`} className="nav-link" activeClassName="active">{tournament.name} Past Winners</NavLink>
        </div>
    );
};

export default TournamentView;
