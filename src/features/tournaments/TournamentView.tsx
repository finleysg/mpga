import * as React from 'react';

import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';

import constants from '../../constants';
import { Tournament } from '../../models/Events';

export interface ITournamentViewProps {
    tournament: Tournament;
}

const TournamentView: React.FunctionComponent<ITournamentViewProps> = (props) => {
    const { tournament } = props;
    return (
        <div>
            <h4 className="text-secondary mb-3">{tournament.name}</h4>
            <ReactMarkdown children={tournament.description} />
            <NavLink
                to={`/tournaments/detail/${tournament.systemName}/${constants.EventCalendarYear}`}
                className="nav-link">
                {constants.EventCalendarYear} Tournament Details
            </NavLink>
            <NavLink to={`/tournaments/history/${tournament.systemName}`} className="nav-link">
                {tournament.name} Past Winners
            </NavLink>
        </div>
    );
};

export default TournamentView;
