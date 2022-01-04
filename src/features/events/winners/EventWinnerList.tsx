import React, { useCallback, useEffect } from "react";

import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import LoadingContainer from "../../../components/LoadingContainer";
import { EventDetail, TournamentWinner } from "../../../models/Events";
import { IApplicationState } from "../../../store";
import TournamentWinnerActions from "../../../store/TournamentWinnerActions";
import usePermissions from "../../../utilities/Permissions";
import EventWinnerDetail from "./EventWinnerDetail";

interface IEventWinnerListProps {
  eventDetail: EventDetail;
}

const EventWinnerList: React.FunctionComponent<IEventWinnerListProps> = (props) => {
  const { eventDetail } = props;
  const { tournament } = eventDetail;
  const dispatch = useDispatch();
  const permissions = usePermissions();
  const state = useSelector((state: IApplicationState) => state.winners);
  const mostRecentWinners = state.groups[0];

  useEffect(() => {
    dispatch(TournamentWinnerActions.LoadTournamentWinners(tournament!));
  }, [dispatch, tournament]);

  const saveWinner = useCallback(
    (winner: TournamentWinner) => dispatch(TournamentWinnerActions.SaveTournamentWinner(tournament!, winner)),
    [dispatch, tournament],
  );

  return (
    <LoadingContainer loading={mostRecentWinners === undefined}>
      <h3 className="text-primary">{mostRecentWinners?.year} Winners</h3>
      <h4>{mostRecentWinners?.location}</h4>
      {mostRecentWinners?.winners.map((winner) => {
        return (
          <EventWinnerDetail
            key={winner.id}
            edit={(winner.id || 0) <= 0}
            winner={winner}
            Cancel={() => TournamentWinnerActions.CancelNew()}
            Save={saveWinner}
          />
        );
      })}
      <p>* Net Score</p>
      {permissions.canManageEvent() && (
        <Button
          variant="link"
          className="text-warning"
          onClick={() =>
            dispatch(
              TournamentWinnerActions.AddNew(
                eventDetail.tournament!,
                eventDetail.eventYear,
                eventDetail.location?.name,
              ),
            )
          }
        >
          New Winner
        </Button>
      )}
      <NavLink
        to={`/tournaments/history/${eventDetail.tournament?.systemName}`}
        className={(isActive) => ("nav-link" + isActive ? "active" : "")}
      >
        Championship History
      </NavLink>
    </LoadingContainer>
  );
};

export default EventWinnerList;
