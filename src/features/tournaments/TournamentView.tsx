import * as React from "react";

import MarkdownRender from "components/MarkdownRender";
import { NavLink } from "react-router-dom";

import constants from "../../app-constants";
import { TournamentDetailProps } from "./tournamentPropTypes";

const TournamentView: React.FC<TournamentDetailProps> = (props) => {
  const { tournament } = props;
  return (
    <div>
      <h4 className="text-secondary mb-3">{tournament.name}</h4>
      <MarkdownRender text={tournament.description} />
      <NavLink to={`/tournaments/detail/${tournament.systemName}/${constants.EventCalendarYear}`} className="nav-link">
        {constants.EventCalendarYear} Tournament Details
      </NavLink>
      <NavLink to={`/tournaments/history/${tournament.systemName}`} className="nav-link">
        {tournament.name} Past Winners
      </NavLink>
    </div>
  );
};

export default TournamentView;
