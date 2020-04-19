import * as React from "react";

import ReactMarkdown from "react-markdown";
import constants from "../../constants";
import { Tournament } from "../../models/Events";
import { NavLink } from "react-router-dom";

export interface ITournamentViewProps {
    tournament: Tournament;
}

const TournamentView: React.FunctionComponent<ITournamentViewProps> = (props) => {
    const { tournament } = props;
    return (
        <div>
            <h4 className="text-secondary mb-3">{tournament.name}</h4>
            <ReactMarkdown source={tournament.description} escapeHtml={true} />
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
