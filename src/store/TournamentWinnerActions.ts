import constants from "../constants";
import { Api } from "../http";
import { ITournamentWinnerGroup, Tournament, TournamentWinner } from "../models/Events";
import NotificationActions from "./NotificationActions";
import AppActions from "./AppActions";
import { ITournamentHistorySearch } from '../features/tournaments/TournamentHistorySearch';

export enum TournamentWinnerActionTypes {
    GET_TOURNAMENT_WINNERS_SUCCEEDED = "GET_TOURNAMENT_WINNERS_SUCCEEDED",
    APPEND_NEW_TOURNAMENT_WINNER = "APPEND_NEW_TOURNAMENT_WINNER",
    CANCEL_NEW_TOURNAMENT_WINNER = "CANCEL_NEW_TOURNAMENT_WINNER",
    SEARCH_TOURNAMENT_WINNERS = "SEARCH_TOURNAMENT_WINNERS",
}

const tournamentWinnerUrl = constants.ApiUrl + "/tournament-winners/";

const TournamentWinnerActions = {
    LoadTournamentWinners: (tournament: Tournament) => async (dispatch: any) => {
        try {
            const result = await Api.get(`${tournamentWinnerUrl}?name=${tournament.systemName}`);
            const data = result.data.map((json: any) => new TournamentWinner(json));
            const grouped = data.reduce((acc: ITournamentWinnerGroup[], item: TournamentWinner) => {
                const group = acc.find(g => g.year === item.year);
                if (group) {
                    group.winners.push(item);
                } else {
                    acc.push({
                        year: item.year,
                        location: item.location,
                        tournament: tournament,
                        winners: [item],
                    });
                }
                return acc;
            }, []);
            dispatch({
                type: TournamentWinnerActionTypes.GET_TOURNAMENT_WINNERS_SUCCEEDED,
                payload: grouped,
            });
        } catch (error) {
            dispatch(NotificationActions.ToastError(error));
        }
    },
    SaveTournamentWinner: (tournament: Tournament, winner: TournamentWinner) => async (dispatch: any) => {
        dispatch(AppActions.Busy());
        try {
            const payload = winner.prepJson();
            if ((winner.id || 0) === 0) {
                await Api.post(tournamentWinnerUrl, payload);
            } else {
                await Api.put(`${tournamentWinnerUrl}${winner.id}/`, payload);
            }
            dispatch(AppActions.NotBusy());
            dispatch(TournamentWinnerActions.LoadTournamentWinners(tournament));
            dispatch(NotificationActions.ToastSuccess("Tournament winner has been saved."));
        } catch (error) {
            dispatch(AppActions.NotBusy());
            dispatch(NotificationActions.ToastError(error));
        }
    },
    AddNew: (tournament: Tournament, year?: number, location?: string) => (dispatch: any) => {
        dispatch({
            type: TournamentWinnerActionTypes.APPEND_NEW_TOURNAMENT_WINNER,
            payload: { tournament: tournament, year: year, location: location },
        });
    },
    CancelNew: () => (dispatch: any) => {
        dispatch({ type: TournamentWinnerActionTypes.CANCEL_NEW_TOURNAMENT_WINNER });
    },
    SearchWinners: (search: ITournamentHistorySearch) => (dispatch: any) => {
        dispatch({
            type: TournamentWinnerActionTypes.SEARCH_TOURNAMENT_WINNERS,
            payload: search,
        });
    },
};

export default TournamentWinnerActions;
