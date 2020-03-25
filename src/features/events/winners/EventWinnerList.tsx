import React, { useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import Loading from "../../../components/Loading";
import { TournamentWinner, EventDetail } from "../../../models/Events";
import { IApplicationState } from "../../../store";
import TournamentWinnerActions from "../../../store/TournamentWinnerActions";
import EventWinnerDetail from "./EventWinnerDetail";

interface IEventWinnerListProps {
    eventDetail: EventDetail;
}

const EventWinnerList: React.FunctionComponent<IEventWinnerListProps> = props => {
    const { eventDetail } = props;
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.winners);
    const session = useSelector((state: IApplicationState) => state.session);
    const mostRecentWinners = state.winners[0];

    useEffect(() => {
        dispatch(TournamentWinnerActions.LoadTournamentWinners(eventDetail.tournament?.systemName || ""));
    }, [dispatch, eventDetail.tournament]);

    const deleteWinner = useCallback(
        (winner: TournamentWinner) => dispatch(TournamentWinnerActions.DeleteTournamentWinner(winner)),
        [dispatch]
    );

    const saveWinner = useCallback(
        (winner: TournamentWinner) => dispatch(TournamentWinnerActions.SaveTournamentWinner(winner)),
        [dispatch]
    );

    return (
        <div>
            {state.isBusy ? (
                <Loading />
            ) : (
                <React.Fragment>
                    <h3 className="text-primary">{mostRecentWinners?.year} Winners</h3>
                    <h4>{mostRecentWinners?.location}</h4>
                    {mostRecentWinners?.winners.map(winner => {
                        return (
                            <EventWinnerDetail
                                key={winner.id}
                                edit={(winner.id || 0) <= 0}
                                winner={winner}
                                Cancel={() => TournamentWinnerActions.CancelNew()}
                                Delete={deleteWinner}
                                Save={saveWinner}
                            />
                        );
                    })}
                    <p>* Net Score</p>
                    {session.user.isFullEditor && (
                        <Button
                            variant="link"
                            className="text-warning"
                            onClick={() =>
                                dispatch(
                                    TournamentWinnerActions.AddNew(
                                        eventDetail.tournament!,
                                        eventDetail.eventYear,
                                        eventDetail.location?.name
                                    )
                                )
                            }>
                            New Winner
                        </Button>
                    )}
                    <NavLink
                        to={`/tournaments/t/${eventDetail.tournament?.systemName}/history`}
                        className="nav-link"
                        activeClassName="active">
                        Championship History
                    </NavLink>
                </React.Fragment>
            )}
        </div>
    );
};

export default EventWinnerList;
